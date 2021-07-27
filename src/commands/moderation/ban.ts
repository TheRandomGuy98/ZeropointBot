import config from '../../../config/config';

import * as Discord from 'discord.js-light';
import { Client, CommandConfig } from '../../types/discord';

import { cleanse } from '../../utils/functions';
import log from '../../utils/log';

const cmd: CommandConfig = {
    desc: `Ban a user.`,
    usage: `<user>`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    const banMemberId = message.mentions.members.first()?.id || args[0];

    const messageMember: Discord.GuildMember = message.guild.members.cache.find(member => member.id === message.author.id);
    const banMember: Discord.GuildMember = message.guild.members.cache.find(member => member.id === banMemberId);

    if (!messageMember.permissions.has(`BAN_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);
    else if (!banMember) return message.channel.send(`${m} That person is not a member of the server!`);
    else if (!banMember.bannable || banMember.roles.cache.some(role => config.staffRoles.includes(role.id))) return message.channel.send(`${m} I cannot ban that user!`);

    args.shift();

    const banReason = args.join(` `) || `No reason provided.`;

    banMember.send(`You were banned from **${message.guild.name}** for ${cleanse(banReason)}.`).catch(() => log(`red`, `Could not DM ${banMember.user.tag} their ban reason.`));
    banMember.ban({ reason: banReason }).then(() => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Banned | ${banMember.user.tag}`)
            .setColor(config.colors.red)
            .setDescription(`${banMember} was banned: ${banReason}\nResponsible Moderator: ${message.author}`)
            .setFooter(config.footer);

        message.delete();
        return message.channel.send(sEmbed);
    });
};

export {
    cmd,
    run
};