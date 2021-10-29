import * as Discord from 'discord.js';
import { Player } from 'discord-player';

import config from '../../../config/config';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `Pause the music player.`,
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
    if (queue.current == null) {
        await message.reply(`The player has already been paused!`);
        return;
    }

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.cyan)
        .setDescription(`🛑 Paused the music`);

    queue.setPaused(true);
    await message.reply({ embeds: [sEmbed] });
};

export {
    cmd,
    run
};
