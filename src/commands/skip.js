const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `skip`,
    description: `Skip the song currently playing.`,
    usage: null,
    aliases: [`s`],
	category: `music`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    const { voiceChannel } = message.member;

    if(!voiceChannel) return message.channel.send(`I'm sorry but you need to be in a voice channel to play music!`);
    const serverQueue = message.client.queue.get(message.guild.id);

    if(!serverQueue) return message.channel.send(`There is nothing playing that I could skip for you.`);
    serverQueue.connection.dispatcher.end(`⏩ The current song has been skipped.`);
    message.channel.send(`⏩ The current song has been skipped.`)
}