import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `Play a song.`,
    usage: `<name | url>`,
    aliases: [`p`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const query = args.join(` `);

    if (!message.member.voice.channel) return message.reply(`You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`You must be in the same voice channel as me to use this!`);

    const queue = client.player.createQueue(message.guild, { metadata: message });
    const song = await client.player.search(query, { requestedBy: message.author });

    if (queue.tracks.length > 0) message.reply(`Your song has been added to the queue!`);
    queue.addTrack(song.tracks[0]);

    if (!message.guild.me.voice.channel) await queue.connect(message.member.voice.channel);
    await queue.play();
};

export {
    cmd,
    run
};
