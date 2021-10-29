
import * as Discord from 'discord.js';
import { Player } from 'discord-player';

import { Client, CommandConfig } from '../../typings/discord';

import config from '../../../config/config';
import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `View the current song.`,
    aliases: [`np`],
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

    if (queue.current == null) await message.reply(`There is no song currently playing!`);

    const song = queue.nowPlaying();

    const npEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Now Playing`, (message?.guild?.iconURL() as string | undefined))
        .setDescription(`[**${cleanse(song.title)}**](${song.url})\nRequested By: **${cleanse(message.author.tag)}**`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    await message.reply({ embeds: [npEmbed] });
};

export {
    cmd,
    run
};
