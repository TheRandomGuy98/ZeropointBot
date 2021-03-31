import { Client } from '../index';
import { config } from '../../config/config';

export const refreshActivity = (client: Client) => {
    client.user.setPresence({
        activity: {
            name: `${client.users.cache.size} members in Alliance Reunited`,
            type: `WATCHING`
        },
        status: `dnd`
    });    
};
