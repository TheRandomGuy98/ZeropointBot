import { Client } from '../types/discord';
import log from './log';

/**
 * Refresh the activity of the client.
 * @param client The Discord client to use.
 */
const refreshActivity = async (client: Client) => {
    log(`cyan`, `Updating status...`);

    await client.user.setPresence({
        activity: {
            name: `${(await (await client.guilds.fetch(`757079346719621150`)).members.fetch()).size} members...`,
            type: `WATCHING`
        },

        status: `online`
    });

    log(`green`, `Status updated.`);
};

export default refreshActivity;
