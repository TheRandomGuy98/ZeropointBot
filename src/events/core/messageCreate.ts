import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import log from '../../utils/log';

export default async (client: Client, message: Discord.Message) => {
    // Botception.
    if (message.author.bot || message.channel.type === `DM`) return;

    // We don't have S&Box keys!
    if (message.content.toLowerCase().includes(`s&box`) || message.content.toLowerCase().includes(`sbox`)) {
        message.delete();
        message.author.send(`We do not have S&box keys. The video linking it to our Discord was not uploaded by us, and we have no relation to it.\nPlease, when you have the chance, report said video so it gets removed.`)
            .catch(() => log(`red`, `Failed to DM S&box warning to ${message.author.tag}`));
    }
};
