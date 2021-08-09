import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import config from '../../../config/config';
import log from '../../utils/log';

export default async (client: Client, interaction: Discord.Interaction) => {
    // No DM channels.
    if (interaction.channel.type === `DM`) return;

    // We don't have S&Box keys!
    if (interaction.message.content.toLowerCase().includes(`s&box`) || interaction.content.toLowerCase().includes(`sbox`)) {
        interaction.delete();
        interaction.author.send(`We do not have S&box keys. The video linking it to our Discord was not uploaded by us, and we have no relation to it.\nPlease, when you have the chance, report said video so it gets removed.`)
            .catch(() => log(`red`, `Failed to DM S&box warning to ${interaction.author.tag}`));
    }

    // Prefix handling.
    if (interaction.content.slice(0, config.prefix.length).toString().toLowerCase() !== config.prefix) return;

    // Parse arguments and command.
    const args = interaction.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command from the handler.
    const cmd = client.commands.get(command) ||
        client.commands.get([...client.commands.keys()][[...client.commands.values()].indexOf([...client.commands.values()].find(cmd => cmd.config.aliases?.includes(command)))]);

    if (!cmd) return;

    if ((cmd.config.usage) && args.length < (cmd.config.usage.split(`<`).length) - 1) return interaction.channel.send(`${m} Proper usage is \`${config.prefix + command} ${cmd.config.usage}\`.`);
    else {
        // Execute the command.
        log(`magenta`, `${interaction.author.tag} [${interaction.author.id}] ran command ${command} in ${interaction.guild.name}.`);
        cmd.run(client, message, args);
    }
};
