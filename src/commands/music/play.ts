import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `Play a song.`,
    usage: `<name | url>`,
    aliases: [`p`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;
    const song = args.join(` `);

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    if (client.player.isPlaying(message)) message.channel.send(`${m} Your song has been added to the queue!`);
    await client.player.play(message, song, true);
};

export {
    cmd,
    run
};