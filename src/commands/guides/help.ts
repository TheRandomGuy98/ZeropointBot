import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `View all commands.`,
    aliases: [`h`, `?`],
    category: `guides`
};

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
