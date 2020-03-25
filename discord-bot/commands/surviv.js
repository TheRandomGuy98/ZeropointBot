const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);

module.exports.run = async(client, message, args) => {
  switch(args[0]) {
    case `servers`:
      let sEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .addField(`North America`, `
[[NYC] New Jersey](https://surviv.io/?region=na&zone=nyc/)
[[CHI] Illinois](https://surviv.io/?region=na&zone=chi/)
[[SFO] California](https://surviv.io/?region=na&zone=sfo/)
[[MIA] Florida](https://surviv.io/?region=na&zone=mia/)
`, true)
          .addField(`Europe`, `
[[WAW] Poland](https://surviv.io/?region=eu&zone=waw/)
[[FRA] Netherlands](https://surviv.io/?region=eu&zone=fra/)
`, true)
          .addField(`Asia`, `
[[NRT] Japan](https://surviv.io/?region=as&zone=nrt/)
[[HKG] Hong Kong](https://surviv.io/?region=as&zone=hkg/)
[[SGP] Singapore](https://surviv.io/?region=as&zone=sgp/)
`, true)
          .addField(`South America`, `[[SAO] Brazil](https://surviv.io/?region=sa&zone=sao/)`, true)
          .addField(`South Korea`, `[[SEL] South Korea](https://surviv.io/?region=ko&zone=sel/)`, true)
          .setTimestamp(new Date())
          .setFooter(config.footer);
        message.channel.send(sEmbed);
        break;
    case `streamsnipe`: 
      let xEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Streamsnipe \`OFFICIALZEROPOINT\` here: https://surviv.io/?region=na&zone=${process.env.STREAMSNIPE_ZONE}/`)
        .setTimestamp(new Date())
        .setFooter(config.footer);
      message.channel.send(xEmbed);
      break;
    default: return message.channel.send(`Proper usage: \`${config.prefix}surviv <subcmd>\``);
  }
}

module.exports.config = {
  name: `surviv`
}