const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  const voiceChannel = message.member.voiceChannel;
	if(!voiceChannel) return message.channel.send(`${message.author} I'm sorry but you need to be in a voice channel to play music!`);
  
  voiceChannel.leave().catch(err => message.channel.send(`${message.author} I am not currently in that voice channel!`)).then(() => config.connection = null);
  store.write(`music/isPlaying`, false);
  return message.channel.send(`${message.author} I have sucessfully left the voice channel.`);
}