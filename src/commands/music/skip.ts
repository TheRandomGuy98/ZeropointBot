import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

import { cleanse } from '../../utils/functions';

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

    message.channel.send(`Skipped song **${cleanse(client.player.nowPlaying(message).title)}**`);
    client.player.skip(message);
};

export {
    cmd,
    run
};
