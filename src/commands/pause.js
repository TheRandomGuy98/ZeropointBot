const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `pause`,
    description: `Pauses music.`,
    usage: null,
    aliases: null,
    category: `music`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Current song was paused!');
		}
		return message.channel.send('There is nothing playing.');
}