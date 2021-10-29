import { Client } from '../typings/discord';
import log from './log';

/**
 * Refresh the activity of the client.
 * @param client The Discord client to use.
 */
const refreshActivity = async (client: Client): Promise<void> => {
    log(`cyan`, `Updating status...`);

    client?.user?.setPresence({
        activities: [{
            name: `${(await (await client.guilds.fetch(`757079346719621150`)).members.fetch()).size} members...`,
            type: `WATCHING`
        }],

        status: `online`
    });

    log(`green`, `Status updated.`);
};

export default refreshActivity;
