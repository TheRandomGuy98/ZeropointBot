const User = require(`../models/user.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

client.on(`guildMemberRemove`, member => {
    let members = member.guild.memberCount + 1;

    let intExt = members.toString().split(``).reverse().join(``).slice(0, 1);
    let intExtension = (intExt == `3` ? `rd`: intExt == `2` ? `nd`: intExt == `1` ? `st`: `th`);

    let sEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor(`Goodbye...`, member.user.avatarURL)
        .setDescription(`**${member.user.tag}** left the server 😭\nHe was the **${members + intExtension}** member...`)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    client.channels.get(`746464551716913183`).send(sEmbed);

    members = client.channels.get(config.serverStats.members);
    members.setName(`Members: ${member.guild.memberCount}`);

    let memberGoal = client.channels.get(config.serverStats.memberGoal);
    if(parseInt(members.name.slice(9)) >= parseInt(memberGoal.name.slice(13))) memberGoal.setName(`Member Goal Reached!`);
});