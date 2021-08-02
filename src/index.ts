import * as Discord from 'discord.js';
import { Player } from 'discord-player';

import { Client } from './types/discord';

import log from './utils/log';
import { cleanse } from './utils/functions';

import * as logExtra from './utils/logExtra';
import * as loader from './modules/loader';

import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();

const client: Client = new Discord.Client({
    disableMentions: `everyone`
});

const player = new Player(client);

client.player = player;
client.player.on(`trackStart`, (message: Discord.Message, track) => message.channel.send(`Now playing **${cleanse(track.title)}**...`));

// Uncaught exception handler.
process.on(`uncaughtException`, e => log(`red`, e.stack));

/**
 * Start up the bot.
 */
const startBot = async () => {
    logExtra.logSplash();

    await loader.loadCommands(client);
    await loader.loadEvents(client);

    logExtra.logHeader();
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });

    log(`green`, `Connected to database.`);

    logExtra.logHeader();
    await client.login(process.env.DISCORD_TOKEN).catch(() => log(`red`, `Failed to authenticate client with application.`));
};

// Initialize the project.
startBot();
