import { config } from '../../config/config';

import * as Discord from 'discord.js';
import { Client } from '../index';

export default async (client: Client, member: Discord.GuildMember) => {
    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Banned | ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL())
        .setColor(config.colors.danger)
        .setDescription(`${member.user} was banned from the server.`)
        .setFooter(config.footer);

    client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send(sEmbed));
};
