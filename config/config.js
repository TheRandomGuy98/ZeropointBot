const dotenv = require(`dotenv`).config();
const pjson = require(`../package.json`);

var config = {
    cooldowns: {
        xp: 6e4
    },
    developerIDs: [`386940319666667521`, `710621703608205363`],
    prefix: `;`,
    serverStats: {
        members: `746480604907962418`,
        memberGoal: `746480568790810805`
    },
    blacklistedWords: require(`./bad-words`),
    roles: {
        muted: `746481868551094325`,
        member: `746566693303877652`,
        dj: `750891497150218335`,
        levels: [
            `750892893920559104`, //Level 1
            `750892894730190910`, //Level 15
            `750892895241764905`, //Level 10
            `750892896156123196`, //Level 15
            `750892896454180935`, //Level 25
            `750893033708322869`, //Level 30
            `750893035013013514`, //Level 40
            `750893035352752258`  //Level 50
        ],
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