import { version } from '../package.json';

import colors from './colors';
import roles from './roles';

import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    developerID: `386940319666667521`,
    prefix: `!`,

    colors,
    roles,

    logChannel: `826956913290903592`,

    version,
    footer: `Created by DamienVesper#0001 | v${version}`
};

export default config;
