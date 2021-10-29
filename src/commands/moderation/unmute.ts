import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

import { fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd: CommandConfig = {
    desc: `Unmute a user.`,
    usage: `<user>`,
    category: `moderation`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const unmuteMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`VIEW_AUDIT_LOG`)) return await message.reply(`You can't use that!`);
    else if (!unmuteMember) return await message.reply(`That person is not a member of the server!`);
    else if (!unmuteMember.roles.cache.some(role => role.name === `Muted`)) return await message.reply(`That person is not muted!`);

    args.shift();

    unmuteMember.send(`You were unmuted in **${message.guild.name}**.`).catch(() => log(`red`, `Could not DM ${unmuteMember.user.tag} their mute reason.`));
    unmuteMember.roles.remove(await message.guild.roles.fetch(config.roles.muted)).then(() => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Unmuted | ${unmuteMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Responsible Moderator:** ${message.author.tag}`)
            .setFooter(config.footer);

        message.delete();
        message.reply({ embeds: [sEmbed] });

        client.channels.fetch(config.logChannel).then(async (channel: Discord.TextChannel) => await channel.send({ embeds: [sEmbed] }));
    });
};

export {
    cmd,
    run
};
