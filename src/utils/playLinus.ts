import * as Discord from 'discord.js';
import { Client } from '../types/discord';

import ytdl from 'ytdl-core';

const getFreeTechTips = (connection: Discord.VoiceConnection) => connection.play(ytdl(`https://www.youtube.com/watch?v=PKfxmFU3lWY`));

const playLinus = async (client: Client) => {
    const linusChannel: Discord.Channel = await client.channels.fetch(`835599503263793232`);

    const freeTechTips = await (linusChannel as Discord.VoiceChannel).join();
    getFreeTechTips(freeTechTips).on(`end`, () => getFreeTechTips(freeTechTips));
};

export default playLinus;
