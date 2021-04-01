import { config } from '../../config/config';

import * as Discord from 'discord.js';
import { Client } from '../index';

export default async (client: Client, member: Discord.GuildMember) => {
    const memberIsBanned = member.guild.fetchBans().then(bans => bans.find(member => member.user.id === memberIsBanned.user.id));
    if (memberIsBanned) return;

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Left | ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL())
        .setColor(config.colors.danger)
        .setDescription(`${member.user} left or was kicked from the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send(sEmbed));
};
