import { Player } from 'discord-player';
import * as Discord from 'discord.js';

import { Client, CommandConfig } from '../../typings/discord';
import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `Skip the current song.`,
    aliases: [`skip`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]): Promise<void> => {
    if (message?.member?.voice.channel == null) {
        await message.reply(`You must be in a voice channel to use this!`);
        return;
    }

    if ((message?.guild?.me?.voice.channel != null) && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        await message.reply(`You must be in the same voice channel as me to use this!`);
        return;
    }

    const queue = (client.player as Player).createQueue((message.guild as Discord.GuildResolvable), { metadata: message });

    if (queue.current == null) {
        await message.reply(`There is no song currently playing!`);
        return;
    }

    await message.reply(`Skipped song **${cleanse(queue.nowPlaying().title)}**.`);
    queue.skip();
};

export {
    cmd,
    run
};
