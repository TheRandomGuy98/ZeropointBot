import { Client } from '../types/discord';
import log from './log';

/**
 * Force-add the member role to all members.
 * @param client The client to utilize for adding roles.
 */
const forceMembers = async (client: Client) => {
    const guild = await client.guilds.fetch(`757079346719621150`);
    const members = await guild.members.fetch();

    for (const member of members) {
        if (!member[1].roles.cache.some(role => role.id === `869785334928539668`)) member[1].roles.add(`869785334928539668`);
        log(`blue`, `Adding role to ${member[1].user.tag}...`);
    };
};

export default forceMembers;
