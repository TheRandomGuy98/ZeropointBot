import * as Discord from 'discord.js';
import { Client } from '../types/discord';

import ytdl from 'ytdl-core';

/**
 * Get some free tech tips.
 * @param connection The connection to connect to.
 */
const getFreeTechTips = (connection: Discord.VoiceConnection) => {
    connection.play(ytdl(`https://www.youtube.com/watch?v=PKfxmFU3lWY`))
        .on(`finish`, () => getFreeTechTips(connection));
};

/**
 * Play a LinusTechTips video.
 * @param client The client to play the video with.
 */
const playLinus = async (client: Client) => {
    const linusChannel: Discord.Channel = await client.channels.fetch(`840081062314639370`);

    const freeTechTips = await (linusChannel as Discord.VoiceChannel).join();
    getFreeTechTips(freeTechTips);
};

export default playLinus;
