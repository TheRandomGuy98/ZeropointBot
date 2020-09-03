const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `nowplaying`,
    description: `Replys with the song that is currently playing`,
    usage: null,
    aliases: [`np`],
    category: `music`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There is nothing playing.`);
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
}