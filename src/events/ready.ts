import { Client } from '../index';
import { log, logHeader } from '../utils/log';

import { refreshActivity } from '../utils/refreshActivity';
import playLinus from '../utils/playLinus';

export default async (client: Client) => {
    log(`green`, `${client.user.tag} has started, with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
    logHeader();

    refreshActivity(client);
    playLinus(client);
};
