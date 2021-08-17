import config from '../../../config/config';
import { Client } from '../../typings/discord';

import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd = new SlashCommandBuilder()
    .setName(`unmute`)
    .setDescription(`Unmute a user.`)
    .addUserOption(option => option
        .setName(`user`)
        .setDescription(`The user to unmute.`)
        .setRequired(true)
    );

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const unmuteMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`VIEW_AUDIT_LOG`)) return message.channel.send(`${m} You can't use that!`);
    else if (!unmuteMember) return message.channel.send(`${m} That person is not a member of the server!`);
    else if (!unmuteMember.roles.cache.some(role => role.name === `Muted`)) return message.channel.send(`${m} That person is not muted!`);

    args.shift();

    unmuteMember.send(`You were unmuted in **${message.guild.name}**.`).catch(() => log(`red`, `Could not DM ${unmuteMember.user.tag} their mute reason.`));
    unmuteMember.roles.remove(await message.guild.roles.fetch(config.roles.muted)).then(() => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Unmuted | ${unmuteMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Responsible Moderator:** ${message.author.tag}`)
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
