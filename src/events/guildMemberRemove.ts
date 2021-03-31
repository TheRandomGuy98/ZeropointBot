import { config } from '../../config/config';

import * as Discord from 'discord.js';
import { Client } from '../index';

export default async (client: Client, user: Discord.User) => {
    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Left | ${user.tag}`)
        .setThumbnail(user.avatarURL())
        .setColor(config.colors.danger)
        .setDescription(`${user} left or was kicked from the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send(sEmbed));
};
