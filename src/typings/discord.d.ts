import { Player } from 'discord-player';
import * as Discord from 'discord.js';

interface CommandConfig {
    desc: string
    category: string
    usage?: string
    aliases?: string[]
}

interface Command {
    config: CommandConfig
    run: (client: Client, message: Discord.Message, args: string[]) => void
}

interface Event {
    callback: unknown
}

interface Client extends Discord.Client {
    commands?: Map<string, Command>
    events?: Map<string, Event>
    player?: Player
}

export {
    Client,
    Command,
    CommandConfig,
    Event
};
