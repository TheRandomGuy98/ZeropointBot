const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  let reportMember = message.mentions.members.first();
  if(!reportMember) return message.channel.send(`${message.author} Please specify a valid member of this server!`);
  if(reportMember.roles.has(`655428618746462251`)) return message.channel.send(`That user has already been reported!`);
  
  let reportReason = args.slice(1).join(` `);
  if(!reportReason) reportReason = `No reason provided.`;

  reportMember.addRole(`655428618746462251`).catch(err => message.channel.send(`That user is a mod / admin.`)); //Add reported role.
  message.channel.send(`**${reportMember.user.username}#${reportMember.user.discriminator}** was reported: **${reportReason}**`);
  
  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Member Reported: ${reportMember} \nReason: *${reportReason}* \nReporter: ${message.author}`)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  client.channels.get(`655241710460469253`).send(sEmbed);
  message.delete();
}

module.exports.config = {
  name: `report`
}