import { Guild } from 'discord.js';

import { Client } from '../typings/discord';
import log from './log';

/**
 * Deploy slash commands to the current guild.
 * @param client The Discord client to use.
 * @param guild The guild to create the command in.
 */
const refreshActivity = async (client: Client, guild: Guild) => {
    log(`cyan`, `Deploying commands...`);

    await guild.commands.set([
        {
            name: `burrito`,
            description: `Coelus' favorite burrito.`
        },
        {
            name: `help`,
            description: `View all commands.`
        },
        {
            name: `servers`,
            description: `View all game servers.`
        },
        {
            name: `ban`,
            description: `Ban a user.`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `The user to ban.`,
                    required: true
                },
                {
                    name: `reasonr`,
                    type: `STRING`,
                    description: `The reason for banning the user.`,
                    required: false
                }
            ]
        }

    ]);
};

export default refreshActivity;

/**
        {
            name: `burrito`,
            description: `Coelus' favorite burrito`,
            options: [{
                name: `input`,
                type: `STRING`,
                description: `The input to echo back`,
                required: true
            }]
        }

 */
