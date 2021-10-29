import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import config from '../../../config/config';

export default async (client: Client, guild: Discord.Guild, user: Discord.User): Promise<void> => {
    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Banned | ${user.tag}`)
        .setThumbnail((user?.avatarURL() as string))
        .setColor(config.colors.red)
        .setDescription(`<@${user.id}> was banned from the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    await client.channels.fetch(config.logChannel).then(async (channel: Discord.TextChannel) => await channel.send({ embeds: [sEmbed] }));
};
