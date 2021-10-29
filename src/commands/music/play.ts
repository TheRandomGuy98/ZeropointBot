import { Player } from 'discord-player';
import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `Play a song.`,
    usage: `<name | url>`,
    aliases: [`p`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]): Promise<void> => {
    const query = args.join(` `);

    if (message?.member?.voice.channel == null) {
        await message.reply(`You must be in a voice channel to use this!`);
        return;
    }

    if ((message?.guild?.me?.voice.channel != null) && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        await message.reply(`You must be in the same voice channel as me to use this!`);
        return;
    }

    const queue = (client.player as Player).createQueue((message.guild as Discord.GuildResolvable), { metadata: message });
    const song = await (client.player as Player).search(query, { requestedBy: message.author });

    if (queue.tracks.length > 0) await message.reply(`Your song has been added to the queue!`);
    queue.addTrack(song.tracks[0]);

    if (message?.guild?.me?.voice.channel == null) await queue.connect(message.member.voice.channel);
    await queue.play();
};

export {
    cmd,
    run
};
