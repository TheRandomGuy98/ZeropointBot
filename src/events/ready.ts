import { Client } from '../index';
import { log, logHeader } from '../utils/log';

export default async (client: Client) => {
    log(`green`, `${client.user.username}#${client.user.discriminator} has started, with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
    logHeader();

    client.user.setPresence({
        activity: {
            name: `${client.users.cache.size} players in Torn.Space`,
            type: `WATCHING`
        },
        status: `dnd`
    });
};
