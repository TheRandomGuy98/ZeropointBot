import * as fs from 'fs';
import * as path from 'path';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

const cmd: CommandConfig = {
    desc: `Coelus' favorite burrito.`,
    aliases: [`breakfastburrito`, `coelus`],
    category: `fun`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    fs.readdir(path.resolve(__dirname, `../../../assets/img/burrito`), (err, files) => {
        if (err != null) throw err;
        const rng = Math.floor(Math.random() * files.length) + 1;

        message.reply({
            files: [path.resolve(__dirname, `../../../assets/img/burrito/${rng}.png`)],
            content: `Coelus wants a breakfast burrito? Whaaat?!`
        });
    });
};

export {
    cmd,
    run
};
