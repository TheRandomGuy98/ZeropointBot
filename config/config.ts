import { version } from '../package.json';

import * as dotenv from 'dotenv';
dotenv.config();

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

    version,
    footer: `Created by DamienVesper#0001 | v${version}`
};

export const config = conf;
