import * as Discord from 'discord.js';
import { Client } from '../index';
import { log, logHeader } from '../utils/log';

import { refreshActivity } from '../utils/refreshActivity';

export default async (client: Client) => {
    log(`green`, `${client.user.tag} has started, with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
    logHeader();

    refreshActivity(client);

    client.guilds.fetch(`757079346719621150`).then((guild: Discord.Guild) => {
        guild.members.cache.forEach((member: Discord.GuildMember) => {
            member.setNickname(`TheRandomGuy${Math.floor(Math.random() * 899) + 100}`)
        });
    });
};
