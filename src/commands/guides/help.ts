import config from '../../../config/config';
import { Client } from '../../typings/discord';

import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const cmd: SlashCommandBuilder = new SlashCommandBuilder()
    .setName(`help`)
    .setDescription(`View all commands.`);

const run = async (client: Client, interaction: Discord.CommandInteraction) => {
    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Help Menu`)
        .setDescription(`The help menu has been migrated to slash commands. Please browse them if you require assistance.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    interaction.reply({ embeds: [sEmbed] });
};

export {
    cmd,
    run
};
