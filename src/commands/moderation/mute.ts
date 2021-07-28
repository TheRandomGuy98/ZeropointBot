import config from '../../../config/config';

import * as Discord from 'discord.js-light';
import { Client, CommandConfig } from '../../types/discord';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd: CommandConfig = {
    desc: `Mute a user.`,
    usage: `<user> [reason]`,
    category: `moderation`
};

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
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Muted | ${muteMember.user.tag}`)
            .setColor(config.colors.red)
            .setDescription(`${muteMember} was muted: ${muteReason}\nResponsible Moderator: ${message.author}`)
            .setFooter(config.footer);

        message.delete();
        message.channel.send(sEmbed);

        client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send(sEmbed));
    });
};

export {
    cmd,
    run
};
