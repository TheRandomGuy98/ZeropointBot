const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `verify`,
    description: `Verify to get access to the rest of the server!`,
    usage: null,
    aliases: null
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;

    if(message.channel.name != `verification`) return message.delete();
    else if(message.member.roles.has(config.roles.member)) return message.channel.send(`${m} You have already verified yourself!`);

    message.channel.send(`${m} You have been verified!`).then(() => message.member.addRole(config.roles.member));
}