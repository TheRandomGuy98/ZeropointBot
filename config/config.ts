import * as dotenv from 'dotenv';
dotenv.config();

const pjson = require(`../package.json`);

const conf = {
    developers: [`386940319666667521`],
    prefix: `z!`,

    serverStats: {
        enabled: false,
        members: ``,
        memberGoal: ``
    },

    db: {
        uri: process.env.MONGO_URI,
        uriParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    version: pjson.version,
    footer: `Created by DamienVesper#0001`
};

conf.footer += ` | v${conf.version}`;

export const config = conf;
