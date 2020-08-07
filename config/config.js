const dotenv = require(`dotenv`).config();
const pjson = require(`../package.json`);

var config = {
    developerIDs: [`386940319666667521`, `342275771546599425`],
	prefix: `z!`,
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