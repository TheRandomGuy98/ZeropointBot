const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);
const axios = require(`axios`);
const ytdl = require(`ytdl-core`);
const fs = require(`fs`);

module.exports.run = async(client, message, args) => {
    if(!config.dispatcher) return message.channel.send(`${message.author} I am not currently playing anything!`)
    config.dispatcher.setVolume((parseInt(args[0]) / 100));
  return message.channel.send(`${message.author} Changed volume to **${args[0]}**%.`);
}