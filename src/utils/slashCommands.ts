import { Guild } from 'discord.js';

import { Client } from '../typings/discord';
import log from './log';

/**
 * Deploy slash commands to the current guild.
 * @param client The Discord client to use.
 * @param guild The guild to create the command in.
 */
const deploySlashCommands = async (client: Client, guild: Guild) => {
    log(`cyan`, `Deploying slash commands...`);

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
                    name: `reason`,
                    type: `STRING`,
                    description: `The reason for banning the user.`,
                    required: false
                }
            ]
        },
        {
            name: `kick`,
            description: `Kick a user.`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `The user to kick.`,
                    required: true
                },
                {
                    name: `reason`,
                    type: `STRING`,
                    description: `The reason for kicking the user.`,
                    required: false
                }
            ]
        },
        {
            name: `mute`,
            description: `Mute a user.`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `The user to mute.`,
                    required: true
                },
                {
                    name: `reason`,
                    type: `STRING`,
                    description: `The reason for muting the user.`,
                    required: false
                }
            ]
        },
        {
            name: `unmute`,
            description: `Unute a user.`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `The user to unmute.`,
                    required: true
                }
            ]
        }
    ]).catch(err => console.log(err));

    log(`green`, `Deployed slash commands.`);
};

export default deploySlashCommands;
