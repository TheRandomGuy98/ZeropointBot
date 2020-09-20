const User = require(`../models/user.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

client.on(`ready`, async() => {
    console.log('\x1b[32m',`${client.user.username}#${client.user.discriminator} v${config.version} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
    console.log(`\x1b[37m`);

	  client.user.setPresence({
        game: {
            name: `${client.users.size} users in Zeropoint Community`,
            type: `WATCHING`
        },
        status: `dnd`
    });
    
    let members = client.channels.get(config.serverStats.members);
    members.setName(`Members: ${client.guilds.get(`746445233704665209`).memberCount}`);

    let memberGoal = client.channels.get(config.serverStats.memberGoal);
    if(parseInt(members.name.slice(9)) >= parseInt(memberGoal.name.slice(13))) memberGoal.setName(`Member Goal Reached!`);

    // client.guilds.get(`746445233704665209`).members.forEach(member => {
    //     const user = new User({
    //         banned: false,
    //         cooldowns: {
    //             xp: 0
    //         },
    //         discordID: member.user.id,
    //         xp: 0,
    //         level: 0,
    //         stats: {
    //             messageCount: 0
    //         }
    //     });
    //     user.save(err => console.log(`[${member.user.id}] ${err ? `There was an error saving data.`: `Succesfully saved data.`}`));
    // });
});