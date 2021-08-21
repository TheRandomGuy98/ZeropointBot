import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `View the current song.`,
    aliases: [`np`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    if (!message.member.voice.channel) return message.reply(`You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`You must be in the same voice channel as me to use this!`);

    const queue = client.player.createQueue(message.guild, { metadata: message });

    if (!queue.current) message.reply(`There is no song currently playing!`);

    const song = queue.nowPlaying();

    const npEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Now Playing`, message.guild.iconURL())
        .setDescription(`[**${cleanse(song.title)}**](${song.url})\nRequested By: **${cleanse(message.author.tag)}**`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.reply({ embeds: [npEmbed] });
};

export {
    cmd,
    run
};
