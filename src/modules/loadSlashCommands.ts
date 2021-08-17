import { Client } from '../typings/discord';
import * as Discord from 'discord.js';

import log from '../utils/log';

/**
 * Load slash commands.
 * @author DamienVesper
 * @param client The client to register commands from.
 * @param guild The guild to register commands to.
 */
const loadSlashCommands = async (client: Client, guild: Discord.Guild): Promise<void> => {
    log(`cyan`, `Loading slash commands...`);

    const slashCommands = [];
    for (const command of client.commands.values()) {
        console.log(command);
    } // slashCommands.push(command.cmd);

    guild.commands.set(slashCommands);

    log(`green`, `Loaded slash commands.`);
};

export default loadSlashCommands;
