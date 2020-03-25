const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`View our twitch [here](https://twitch.tv/officialzeropoint/).`)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  message.channel.send(sEmbed);
}

module.exports.config = {
  name: `twitch`
}