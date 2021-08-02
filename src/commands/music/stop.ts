import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `Skip the current song.`,
    aliases: [`skip`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    if (!client.player.isPlaying(message)) return message.channel.send(`${m} There is no song currently playing!`);

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.cyan)
        .setDescription(`🛑 Stopped playing music`);

    client.player.stop(message);
    message.channel.send(sEmbed);
};

export {
    cmd,
    run
};
