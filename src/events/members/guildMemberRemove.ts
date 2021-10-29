import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import config from '../../../config/config';
import refreshActivity from '../../utils/refreshActivity';

export default async (client: Client, member: Discord.GuildMember): Promise<void> => {
    await refreshActivity(client);

    const memberIsBanned = member.guild.bans.fetch().then(bans => bans.find(ban => ban.user.id === member.user.id));
    if (memberIsBanned == null) return;

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Left | ${member.user.tag}`)
        .setThumbnail((member.user.avatarURL() as string))
        .setColor(config.colors.red)
        .setDescription(`<@${member.user.id}> left or was kicked from the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    await client.channels.fetch(config.logChannel).then(async (channel: Discord.TextChannel) => await channel.send({ embeds: [sEmbed] }));
};
