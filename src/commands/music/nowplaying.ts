import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `View the current song.`,
    aliases: [`nowplaying`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    if (!client.player.isPlaying(message)) message.channel.send(`${m} There is no song currently playing!`);

    const song = client.player.nowPlaying(message);

    const npEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Now Playing`, message.guild.iconURL())
        .setDescription(`**${cleanse(song.title)}**\nRequested By: **${cleanse(message.author.tag)}**`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.channel.send(npEmbed);
};

export {
    cmd,
    run
};
