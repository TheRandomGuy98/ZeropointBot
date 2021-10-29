import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import config from '../../../config/config';
import log from '../../utils/log';

import { Client as DClient } from '../../typings/discord';

export default async (client: Client, message: Discord.Message): Promise<void> => {
    // Botception.
    if (message.author.bot || message.channel.type === `DM`) return;

    // We don't have S&Box keys!
    if (message.content.toLowerCase().includes(`s&box`) || message.content.toLowerCase().includes(`sbox`)) {
        message?.delete();
        message.author.send(`We do not have S&box keys. The video linking it to our Discord was not uploaded by us, and we have no relation to it.\nPlease, when you have the chance, report said video so it gets removed.`)
            .catch(() => log(`red`, `Failed to DM S&box warning to ${message.author.tag}`));
    }

    // Prefix handling.
    if (message.content.slice(0, config.prefix.length).toString().toLowerCase() !== config.prefix) return;

    // Parse arguments and command.
    const args = (message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = (args.shift() as string).toLowerCase();

    // Grab the command from the handler.
    const cmd = ((client.commands as typeof Client[`commands`].get(command) != null) ||
        client.commands.get([...client.commands.keys()][[...client.commands.values()].indexOf([...client.commands.values()].find(cmd => cmd.config.aliases?.includes(command)))]);

    if (cmd == null) return;

    if ((cmd.config.usage) && args.length < (cmd.config.usage.split(`<`).length) - 1) return await message.reply(`Proper usage is \`${config.prefix + command} ${cmd.config.usage}\`.`);
    else {
        // Execute the command.
        log(`magenta`, `${message.author.tag} [${message.author.id}] ran command ${command} in ${message.guild.name}.`);
        cmd.run(client, message, args);
    }
};
