import * as Discord from 'discord.js';
import { Client } from '../index';

import { config } from '../../config/config';
import { log } from '../utils/logExtra';

export default async (client: Client, message: Discord.Message) => {
    const m = `${message.author} »`;

    // Botception and prefix handling.
    if (message.author.bot || message.channel.type === `dm`) return;
    if (message.content.slice(0, config.prefix.length).toString().toLowerCase() !== config.prefix) return;

    // Parse arguments and command.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command from the handler and run it.
    const cmd = client.commands.find(cmd => cmd.name === command || (cmd.aliases && cmd.aliases.includes(command)));
    if (!cmd) return;

    if ((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${m} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {
        log(`magenta`, `${message.author.tag} ran command ${command} in ${message.guild.name}.`);
        cmd.run(client, message, args);
    }
};
