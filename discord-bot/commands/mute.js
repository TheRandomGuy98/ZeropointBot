const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`${message.author} You're not allowed to use that!`);

  let muteMember = message.mentions.members.first();
  if(!muteMember) return message.channel.send(`${message.author} Please specify a valid member of this server!`);
  if(!muteMember.kickable) return message.channel.send(`${message.author} That user is a mod / admin.`);
  if(muteMember.roles.has(`655205687521181700`)) return message.channel.send(`That user has already been muted!`);
  
  let muteReason = args.slice(1).join(` `);
  if(!muteReason) muteReason = `No reason provided.`;

  muteMember.addRole(`655205687521181700`).catch(err => message.channel.send(`That user is a mod / admin.`)); //Add muted role.
  muteMember.removeRole(`655205685365047306`).catch(err => message.channel.send(`That user is a mod / admin.`)) //Remove member role.
  message.channel.send(`**${muteMember.user.username}#${muteMember.user.discriminator}** was muted: **${muteReason}**`);
  
  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Member Muted: ${muteMember} \nReason: *${muteReason}* \nModerator: ${message.author}`)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  client.channels.get(`655241710460469253`).send(sEmbed);
  message.delete();
}

module.exports.config = {
  name: `mute`
}