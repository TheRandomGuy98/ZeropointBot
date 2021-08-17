import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../src/typings/discord';

import { cleanse } from '../../src/utils/functions';

const cmd: CommandConfig = {
    desc: `Skip the current song.`,
    aliases: [`skip`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    const queue = client.player.createQueue(message.guild, { metadata: message });

    if (!queue.current) return message.channel.send(`${m} There is no song currently playing!`);

    message.channel.send(`Skipped song **${cleanse(queue.nowPlaying().title)}**.`);
    queue.skip();
};

export {
    cmd,
    run
};
