import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `View the song queue.`,
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    if (!client.player.isPlaying(message)) message.channel.send(`${m} There is no song currently playing!`);

    const queue = client.player.getQueue(message);

    const queueEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Server Queue`, message.guild.iconURL())
        .setDescription(`${queue.tracks.map((tracks, i) => `${i === 0 ? `Current` : `${i + 1}`}- ${cleanse(tracks.title)} : ${cleanse(tracks.author)}`).join(`\n`)}`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.channel.send(queueEmbed);
};

export {
    cmd,
    run
};
