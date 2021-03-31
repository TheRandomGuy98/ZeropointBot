import * as dotenv from 'dotenv';

import * as fs from 'fs';
import * as Discord from 'discord.js';
import * as path from 'path';

import * as mongoose from 'mongoose';

import { config } from '../config/config';
import { log, logHeader, logSplash } from './utils/log';

dotenv.config();

mongoose.connect(config.db.uri, config.db.uriParams);
log(`green`, `Connected to database.`);

export interface Client extends Discord.Client {
    commands?: any[]
    events?: any[]
}

const client: Client = new Discord.Client({
    disableMentions: `all`
});

// Uncaught handler.
process.on(`uncaughtException`, e => log(`red`, e.stack));

logSplash();

// Load events.
logHeader();
const eventFiles = fs.readdirSync(path.resolve(__dirname, `./events`)).filter(file => file.endsWith(`ts`));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    log(`yellow`, `Loaded event ${file}.`);
    client.on(file.split(`.`)[0], event.bind(null, client));
}

// Load commands.
logHeader();
client.commands = [];
const commandFiles = fs.readdirSync(path.resolve(__dirname, `./commands`)).filter(file => file.endsWith(`ts`));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    log(`yellow`, `Loaded command ${file}.`);
    client.commands.push({
        name: file.split(`.`)[0],
        desc: command.desc,
        usage: command.usage,
        run: command.run
    });
}

logHeader();
client.login(process.env.DISCORD_TOKEN).catch(() => log(`red`, `Failed to authenticate client with application.`));
