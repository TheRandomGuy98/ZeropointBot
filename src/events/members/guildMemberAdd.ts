import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import config from '../../../config/config';
import refreshActivity from '../../utils/refreshActivity';

export default async (client: Client, member: Discord.GuildMember): Promise<void> => {
    await refreshActivity(client);

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Joined | ${member.user.tag}`)
        .setThumbnail((member.user.avatarURL() as string))
        .setColor(config.colors.green)
        .setDescription(`<@${member.user.id}> joined the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    await client.channels.fetch(config.logChannel).then(async (channel: Discord.TextChannel) => await channel.send({ embeds: [sEmbed] }));
};
