import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

import { FieldsEmbed } from 'discord-paginationembed';
import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `View the song queue.`,
    aliases: [`q`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    const queue = client.player.getQueue(message);
    if (!queue || queue.tracks.length === 0) return message.channel.send(`${m} There are no songs in the queue!`);

    const queueEmbed = new FieldsEmbed()
        .setArray(queue.tracks)
        .formatField(`Songs`, (i: any) => `**${queue.tracks.indexOf(i) === 0 ? `Current` : `${queue.tracks.indexOf(i)}`}:** [${cleanse(i.title)}](${i.url}) ${queue.tracks.indexOf(i) === 0 ? `\n` : ``}`)
        .setAuthorizedUsers([message.author.id])
        .setChannel((message.channel as Discord.TextChannel))
        .setElementsPerPage(10)
        .setPage(1)
        .setPageIndicator(true)
        .setDisabledNavigationEmojis([`delete`]);

    queueEmbed.embed
        .setAuthor(`Server Queue`, message.guild.iconURL())
        .setTimestamp(new Date())
        .setFooter(config.footer);

    await queueEmbed.build();

    message.reply(queueEmbed);
};

export {
    cmd,
    run
};
