const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);
const axios = require(`axios`);
const ytdl = require(`ytdl-core`);
const fs = require(`fs`);

module.exports.run = async(client, message, args) => {
  if(!config.connection) return message.channel.send(`${message.author} I am not currently connected to a voice channel!`);
  config.dispatcher = config.connection.playStream(ytdl(args[0]));
  config.dispatcher.setVolume(config.volume | 1);
}