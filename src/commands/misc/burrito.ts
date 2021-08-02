import * as fs from 'fs';
import * as path from 'path';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `Coelus' favorite burrito.`,
    aliases: [`breakfastburrito`, `coelus`],
    category: `misc`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    fs.readdir(path.resolve(__dirname, `../../../assets/img/burrito`), (err, files) => {
        if (err) throw err;
        const rng = Math.floor(Math.random() * files.length) + 1;

        message.channel.send({
            files: [path.resolve(__dirname, `../../../assets/img/burrito/${rng}.png`)],
            content: `${m} Coelus wants a breakfast burrito? Whaaat?!`
        });
    });
};

export {
    cmd,
    run
};
