import config from '../../../config/config';
import { Client } from '../../typings/discord';

import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd = new SlashCommandBuilder()
    .setName(`ban`)
    .setDescription(`Ban a user.`)
    .addUserOption(option => option
        .setName(`user`)
        .setDescription(`The user to ban.`)
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName(`reason`)
        .setDescription(`The reason for banning the user.`)
        .setRequired(false)
    );

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const banMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`BAN_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);
    else if (!banMember) return message.channel.send(`${m} That person is not a member of the server!`);

    else if (banMember.id === message.author.id) return message.channel.send(`You cannot ban yourself!`);
    else if (!banMember.bannable || banMember.roles.cache.some(role => role.name.includes(`Staff`))) return message.channel.send(`${m} I cannot ban that user!`);

    args.shift();

    const banReason = args.join(` `) || `No reason provided.`;

    banMember.send(`You were banned from **${message.guild.name}** for ${cleanse(banReason)}.`).catch(() => log(`red`, `Could not DM ${banMember.user.tag} their ban reason.`));
    banMember.ban({ reason: banReason }).then(() => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Banned | ${banMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Reason:** ${banReason}\n**Responsible Moderator:** ${message.author.tag}`)
            .setFooter(config.footer);

        message.delete();
        return message.channel.send({ embeds: [sEmbed] });
    });
};

export {
    cmd,
    run
};
