import config from '../../../config/config';
import { Client } from '../../typings/discord';

import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd = new SlashCommandBuilder()
    .setName(`mute`)
    .setDescription(`Mute a user.`)
    .addUserOption(option => option
        .setName(`user`)
        .setDescription(`The user to mute.`)
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName(`reason`)
        .setDescription(`The reason for muting the user.`)
        .setRequired(false)
    );

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const muteMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`VIEW_AUDIT_LOG`)) return message.channel.send(`${m} You can't use that!`);
    else if (!muteMember) return message.channel.send(`${m} That person is not a member of the server!`);
    else if (muteMember.roles.cache.some(role => role.name === `Muted`)) return message.channel.send(`${m} That person is already muted!`);

    else if (muteMember.id === message.author.id) return message.channel.send(`You cannot mute yourself!`);
    else if (muteMember.roles.cache.some(role => role.name.includes(`Staff`))) return message.channel.send(`${m} I cannot mute that user!`);

    args.shift();
    const muteReason = args.join(` `) || `No reason provided.`;

    muteMember.send(`You were muted in **${message.guild.name}** for ${cleanse(muteReason)}.`).catch(() => log(`red`, `Could not DM ${muteMember.user.tag} their mute reason.`));
    muteMember.roles.add(await message.guild.roles.fetch(config.roles.muted)).then(() => {
        // If they are in a voice channel, disconnect them.
        if (muteMember.voice?.channel) muteMember.voice.disconnect();

        // Server mute and deafen them.
        muteMember.voice.setMute(true);
        muteMember.voice.setDeaf(true);

        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Muted | ${muteMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Reason:** ${muteReason}\n**Responsible Moderator:** ${message.author.tag}`)
            .setFooter(config.footer);

        message.delete();
        message.channel.send({ embeds: [sEmbed] });

        client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send({ embeds: [sEmbed] }));
    });
};

export {
    cmd,
    run
};
