import config from '../../../config/config';
import { Client } from '../../typings/discord';

import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd = new SlashCommandBuilder()
    .setName(`kick`)
    .setDescription(`Kick a user.`)
    .addUserOption(option => option
        .setName(`user`)
        .setDescription(`The user to kick.`)
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName(`reason`)
        .setDescription(`The reason for kicking the user.`)
        .setRequired(false)
    );

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const kickMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`KICK_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);
    else if (!kickMember) return message.channel.send(`${m} That person is not a member of the server!`);

    else if (kickMember.id === message.author.id) return message.channel.send(`You cannot kick yourself!`);
    else if (!kickMember.kickable || kickMember.roles.cache.some(role => role.name.includes(`Staff`))) return message.channel.send(`${m} I cannot kick that user!`);

    args.shift();
    const kickReason = args.join(` `) || `No reason provided.`;

    kickMember.send(`You were kicked from **${message.guild.name}** for ${cleanse(kickReason)}.`).catch(() => log(`red`, `Could not DM ${kickMember.user.tag} their kick reason.`));
    kickMember.kick(kickReason).then(() => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Kicked | ${kickMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Reason:** ${kickReason}\n**Responsible Moderator:** ${message.author.tag}`)
            .setFooter(config.footer);

        message.delete();
        return message.channel.send({ embeds: [sEmbed] });
    });
};

export {
    cmd,
    run
};
