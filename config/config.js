const dotenv = require(`dotenv`).config();
const pjson = require(`../package.json`);

var config = {
    developerIDs: [`386940319666667521`, `710621703608205363`],
    prefix: `z!`,
    serverStats: {
        members: `746480604907962418`,
        memberGoal: `746480568790810805`
    },
    roles: {
        muted: `746481868551094325`,
        member: `746566693303877652`
    },
    token: process.env.DISCORD_BOT_TOKEN,
    db: {
        uri: process.env.DATABASE_URI,
        uriParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        password: process.env.DATABASE_PASSWORD
    },
    version: pjson.version,
    footer: `© Zeropoint Community 2020`
}

config.footer += ` | v${config.version}`;
module.exports = config;