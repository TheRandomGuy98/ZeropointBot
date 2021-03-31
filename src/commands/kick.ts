import { config } from '../../config/config';

import { cleanse } from '../utils/functions';
import { log } from '../utils/log';

import * as Discord from 'discord.js';
import { Client } from '../index';

export default {
    desc: `Kick a user.`,
    usage: `<user>`
};

export const run = async (client: Client, message: Discord.Message, args: any[]) => {
    const m = `${message.author} »`;

    const kickMemberId = message.mentions.members.first()?.id || args[0];

    const messageMember: Discord.GuildMember = message.guild.members.cache.find(member => member.id === message.author.id);
    const kickMember: Discord.GuildMember = message.guild.members.cache.find(member => member.id === kickMemberId);

    if (!messageMember.permissions.has(`KICK_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);
    else if (!kickMember) return message.channel.send(`${m} That person is not a member of the server!`);
    else if (!kickMember.kickable || kickMember.roles.cache.some(role => config.staffRoles.includes(role.id))) return message.channel.send(`${m} I cannot kick that user!`);

    args.shift();
    const kickReason = args.join(` `) || `No reason provided.`;

    kickMember.send(`You were kicked from **${message.guild.name}** for ${cleanse(kickReason)}.`).catch(() => log(`red`, `Could not DM ${kickMember.user.tag} their kick reason.`));
    kickMember.kick(kickReason).then(() => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Kicked | ${kickMember.user.tag}`)
            .setColor(config.colors.danger)
            .setDescription(`${kickMember} was kicked: ${kickReason}\nResponsible Moderator: ${message.author}`)
            .setFooter(config.footer);

        message.delete();
        return message.channel.send(sEmbed);
    });
};
