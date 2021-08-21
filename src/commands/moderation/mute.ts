import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd: CommandConfig = {
    desc: `Mute a user.`,
    usage: `<user> [reason]`,
    category: `moderation`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const muteMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`VIEW_AUDIT_LOG`)) return message.reply(`You can't use that!`);
    else if (!muteMember) return message.reply(`That person is not a member of the server!`);
    else if (muteMember.roles.cache.some(role => role.name === `Muted`)) return message.reply(`That person is already muted!`);

    else if (muteMember.id === message.author.id) return message.reply(`You cannot mute yourself!`);
    else if (muteMember.roles.cache.some(role => role.name.includes(`Staff`))) return message.reply(`I cannot mute that user!`);

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
        message.reply({ embeds: [sEmbed] });

        client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send({ embeds: [sEmbed] }));
    });
};

export {
    cmd,
    run
};
