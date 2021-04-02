import { Client } from '../index';

export const refreshActivity = (client: Client) => {
    client.user.setPresence({
        activity: {
            name: `${client.users.cache.size} members in Alliance Reunited`,
            type: `WATCHING`
        },
        status: `dnd`
    });
};
