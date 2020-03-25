const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  const voiceChannel = message.member.voiceChannel;
	if(!voiceChannel) return message.channel.send(`${message.author} I'm sorry but you need to be in a voice channel to play music!`);
  
  config.connection = await voiceChannel.join();
  store.write(`music`, {
    isPlaying: true,
    message: message,
    channel: args[0]
  });
  return message.channel.send(`${message.author} I have succesfully joined **${voiceChannel.name}**.`);
}