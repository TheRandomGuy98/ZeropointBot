const User = require(`../models/user.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

client.on(`ready`, async() => {
    console.log('\x1b[32m',`${client.user.username}#${client.user.discriminator} v${config.version} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);

  // client.guilds.get(`708876978580750356`).members.get(`386940319666667521`).addRole(`737550568263778305`);
    // let memberCount = client.guilds.get(`658428108185010197`).memberCount; //add this whenever its added to goldenheart discord
	client.user.setPresence({
        game: {
            name: `${client.users.size} users in Zeropoint Community`,
            type: `WATCHING`
        },
        status: `dnd`
	});
});