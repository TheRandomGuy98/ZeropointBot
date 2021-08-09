import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `View all servers.`,
    category: `guides`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const serverEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Servers`, message.guild.iconURL(), `https://alru.ga/servers`)
        .addField(`Garry's Mod`, `
            Family Guy DarkRP - [65.21.242.45:9000](https://alru.ga/servers)
            Among Us - [207.225.26.215:65436](https://alru.ga/servers)
            CityRP - [207.225.26.215:65437](https://alru.ga/servers)
        `)
        .addField(`Minecraft`, `AlruMC Network - [mc.alru.ga](https://alru.ga/servers)`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.channel.send({ embeds: [serverEmbed] });
};

export {
    cmd,
    run
};
