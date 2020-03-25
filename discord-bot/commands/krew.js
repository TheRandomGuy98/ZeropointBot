const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(config.jsonstoreToken);
const axios = require(`axios`);

module.exports.run = async(client, message, args) => {
  switch(args[0]) {
    case `servers`: 
      axios.get(`http://krew.io/get_servers`).then(res => {
        // {"3036":{"ip":"45.77.109.150","port":"2000","playerCount":24},"3037":{"ip":"45.77.109.150","port":"2001","playerCount":3}}
        let server1 = res.data[Object.keys(res.data)[0]];
        let server2 = res.data[Object.keys(res.data)[1]];

        let sEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`Server 1`, `
Host: ${Object.keys(res.data)}
IP: ${server1.ip}
Port: ${server1.port}
Player Count: ${server1.playerCount}
`, true)
        .addField(`Server 2`, `
Host: ${Object.keys(res.data)[1]}
IP: ${server2.ip}
Port: ${server2.port}
Player Count: ${server2.playerCount}
`, true)
        .setTimestamp(new Date())
        .setFooter(config.footer);

        message.channel.send(sEmbed).catch(err => message.channel.send(`There was an error while fetching server data. Please check with the developer of the application.`));
      }).catch(err => message.channel.send(`Failed to fetch data. The game may be down.`));
      break;
    default: return message.channel.send(`Proper usage: \`${config.prefix}krew <subcmd>\``);
  }
}

module.exports.config = {
  name: `krew`
}