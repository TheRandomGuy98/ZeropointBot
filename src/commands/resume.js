const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `resume`,
    description: `Resumes music if paused.`,
    usage: null,
    aliases: null,
    category: `music`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Current song was resumed!');
		}
		return message.channel.send('There is nothing playing.');
}