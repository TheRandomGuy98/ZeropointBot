import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `Skip the current song.`,
    aliases: [`skip`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    if (!message.member.voice.channel) return message.reply(`You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`You must be in the same voice channel as me to use this!`);

    const queue = client.player.createQueue(message.guild, { metadata: message });

    if (!queue.current) return message.reply(`There is no song currently playing!`);

    message.reply(`Skipped song **${cleanse(queue.nowPlaying().title)}**.`);
    queue.skip();
};

export {
    cmd,
    run
};
