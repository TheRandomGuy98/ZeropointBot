import { Player } from 'discord-player';
import * as Discord from 'discord.js';

interface CommandConfig {
    desc: string;
    category: string;
    usage?: string;
    aliases?: string[];
}

interface Command {
    cmd: any;
    run: any;
}

interface Event {
    callback: any;
}

interface Client extends Discord.Client {
    commands?: Map<string, Command>;
    events?: Map<string, Event>;
    player?: Player;
}

export {
    Client,
    Command,
    CommandConfig,
    Event
};
