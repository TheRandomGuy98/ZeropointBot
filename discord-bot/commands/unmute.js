const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`${message.author} You're not allowed to use that!`);

  let unmuteMember = message.mentions.members.first();
  if(!unmuteMember) return message.channel.send(`${message.author} Please specify a valid member of this server!`);
  if(!unmuteMember.kickable) return message.channel.send(`${message.author} That user is a mod / admin.`);
  if(!(unmuteMember.roles.has(`655205687521181700`))) return message.channel.send(`${message.author} That user is not currently muted!`);
  
  
  unmuteMember.addRole(`655205685365047306`).catch(err => message.channel.send(`That user is a mod / admin.`)) //Add member role.
  unmuteMember.removeRole(`655205687521181700`).catch(err => message.channel.send(`That user is a mod / admin.`)); //Remove muted role.
  message.channel.send(`**${unmuteMember.user.username}#${unmuteMember.user.discriminator}** was unmuted.`);
  
  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Member Unmuted: ${unmuteMember} \nModerator: ${message.author}`)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  client.channels.get(`655241710460469253`).send(sEmbed);  
  message.delete();
}

module.exports.config = {
  name: `unmute`
}