import { config } from '../../config/config';

import * as Discord from 'discord.js';
import { Client } from '../index';

export default {
    desc: `Ban a user.`,
    usage: `<user>`
};

export const run = async (client: Client, message: Discord.Message, args: any[]) => {
    const m = `${message.author} »`;

    const banMemberId = message.mentions.members.first()?.id || args[0];

    const messageMember: Discord.GuildMember = message.guild.members.cache.find(member => member.id === message.author.id);
    const banMember: Discord.GuildMember = message.guild.members.cache.find(member => member.id === banMemberId);

    if (!messageMember.permissions.has(`BAN_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);
    else if (!banMember) return message.channel.send(`${m} That person is not a member of the server!`);
    else if (!banMember.bannable) return message.channel.send(`${m} I cannot ban that user!`);

    const banReason = args[1] || `No reason provided.`;

    banMember.ban(banReason).then(() => {
        const sEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Banned`)
            .setColor(0xf82055)
            .setDescription(`${banMember.user.tag} was banned`)
            .setFooter(config.footer);
    });
};
