import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `Pause the music player.`,
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    if (!client.player.isPlaying(message)) return message.channel.send(`${m} There is no song currently playing!`);
    if (!client.player.isPlaying(message)) return message.channel.send(`${m} The player has already been paused!`);

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.cyan)
        .setDescription(`🛑 Paused the music`);

    client.player.pause(message);
    message.channel.send(sEmbed);
};

export {
    cmd,
    run
};
