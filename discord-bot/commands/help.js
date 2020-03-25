const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  let sEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(`Moderation`, `
\`${config.prefix}ban <user>\` - Ban a user.
\`${config.prefix}kick <user>\` - Kick a user.
\`${config.prefix}mute <user>\` - Mute a user.
\`${config.prefix}unmute <user>\` - Unmute a user.
\`${config.prefix}purge <number>\` - Purge messages.
\`${config.prefix}report <user> <reason>\` - Report a user.
`, true)
    .addField(`Others`, `
\`${config.prefix}krew <subcmd>\` - Krew.io commands.
\`${config.prefix}surviv <subcmd>\` - Surviv.io commands.
\`${config.prefix}twitch\` - View our twitch.
\`${config.prefix}poll <name>\` - Create a poll.
\`${config.prefix}scam\` - Add a scammer.
\`${config.prefix}help\` - This command.
`, true)
    .setTimestamp(new Date())
    .setFooter(config.footer);
  message.channel.send(sEmbed);
}

module.exports.config = {
  name: `help`
}