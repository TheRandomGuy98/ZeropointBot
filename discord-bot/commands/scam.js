const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  // if(message.author.id == `593416061005725707`) return message.channel.send(`${message.author} TypeError: null is not defined.`);

  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`It seems to me that this user has nothing...`)
    .setTimestamp(new Date())
    .setFooter(config.footer);

  message.channel.send(`What is the name of the scammer?`).then(a => {
    message.channel.awaitMessages(b => b.author == message.author, {
      max: 1,
      time: 30000,
      errors: [`time`]
    }).then(c => {
      message.channel.send(`What is the contact number of the scammer?`).then(d => {
        message.channel.awaitMessages(e => e.author == message.author, {
          max: 1,
          time: 30000,
          errors: [`time`]
        }).then(f => {
          sEmbed.setDescription(`Name: **${c.first().content}**\nContact: **${f.first().content}**`);
          
          client.channels.get(`655253272185143296`).send(sEmbed);
          message.channel.send(`Succesfully reported scammer to <#655253272185143296>.`);
        }).catch(err => message.channel.send(`${message.author} Failed to get data within the allotted time.`));
      });
    }).catch(err => message.channel.send(`${message.author} Failed to get data within the allotted time.`));  
  });
}

module.exports.config = {
  name: `scam`
}