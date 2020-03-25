const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`${message.author} You can't use that!`);

  if(!args[0]) return message.channel.send(`${message.author} Specify the number of messages to be deleted!`);
  let msgAmount = parseInt(args[0]);
  if(isNaN(msgAmount)) return message.channel.send(`${message.author} MessageCount has to be a number.`);
  
  if(msgAmount > 100) return message.channel.send(`${message.author} MessageCount cannot go over 100!`);
  else if(msgAmount < 1) return message.channel.send(`${message.author} MessageCount cannot go below 1!`);
  
  message.delete();
  await message.channel.fetchMessages({ limit: msgAmount }).then(messages => message.channel.bulkDelete(messages));

  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Bulk Delete: ${message.channel} \nMessages Deleted: *${msgAmount}* \nModerator: ${message.author}`)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  client.channels.get(`655241710460469253`).send(sEmbed);
  message.delete();

}

module.exports.config = {
  name: `purge`
}