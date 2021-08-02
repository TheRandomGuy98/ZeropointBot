import * as Discord from 'discord.js';
import { Client } from '../../types/discord';

import config from '../../../config/config';

export default async (client: Client, guild: Discord.Guild, user: Discord.User) => {
    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Banned | ${user.tag}`)
        .setThumbnail(user.avatarURL())
        .setColor(config.colors.red)
        .setDescription(`${user} was banned from the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send(sEmbed));
};
