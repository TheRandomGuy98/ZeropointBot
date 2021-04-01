import { config } from '../../config/config';

import * as Discord from 'discord.js';
import { Client } from '../index';

export default async (client: Client, member: Discord.GuildMember) => {
    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Joined | ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL())
        .setColor(config.colors.success)
        .setDescription(`${member.user} joined the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send(sEmbed));
};
