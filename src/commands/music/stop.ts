import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `Stop all music from playing.`,
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    if (!message.member.voice.channel) return message.reply(`You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`You must be in the same voice channel as me to use this!`);

    const queue = client.player.createQueue(message.guild, { metadata: message });

    if (!queue.current) return message.reply(`There is no song currently playing!`);

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.cyan)
        .setDescription(`🛑 Stopped playing music`);

    queue.destroy(true);
    message.reply({ embeds: [sEmbed] });
};

export {
    cmd,
    run
};
