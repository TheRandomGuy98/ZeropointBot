const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `leave`,
    description: `Make the bot leave the channel.`,
    usage: null,
    aliases: `fuckoff`,
    category: `music`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;

    if(!message.member.channel) return message.channel.send(`${m} I'm sorry, but you need to be in a voice channel to disconnect me!`);
    const serverQueue = message.client.queue.get(message.guild.id);

    if(message.guild.voiceconnection) {
        if(serverQueue) serverQueue.connection.dispatcher.destroy();
        message.client.queue.delete(message.guild.id);
        message.member.voice.channel.leave();
        message.channel.send(`👋 I have left the voice channel.`);
    }
    else {
        serverQueue.songs = [];
        message.client.queue.delete(message.guild.id);
        message.channel.send(`${m} I am not in a voice channel!`);
    }
}