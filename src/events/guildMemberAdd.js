const User = require(`../models/user.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

client.on(`guildMemberAdd`, member => {
    let members = member.guild.memberCount;

    let intExt = members.toString().split(``).reverse().join(``).slice(0, 1);
    let intExtension = (intExt == `3` ? `rd`: intExt == `2` ? `nd`: intExt == `1` ? `st`: `th`);

    let sEmbed = new Discord.RichEmbed()
        .setColor(0x00ff00)
        .setAuthor(`Welcome!`, member.user.avatarURL)
        .setDescription(`Welcome to the server, **${member.user.tag}**!\nYou are the **${members + intExtension}** member!`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    let xEmbed = new Discord.RichEmbed()
        .setColor(0xffa500)
        .setAuthor(`Welcome!`, member.user.avatarURL)
        .setDescription(`Welcome to **${member.guild.name}**!\nType \`${config.prefix}verify\` to verify yourself and gain access to the rest of the server!`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    client.channels.get(`746464551716913183`).send(sEmbed);
    client.channels.get(`746904349879435405`).send(xEmbed);


    members = client.channels.get(config.serverStats.members);
    members.setName(`Members: ${member.guild.memberCount}`);

    let memberGoal = client.channels.get(config.serverStats.memberGoal);
    if(parseInt(members.name.slice(9)) >= parseInt(memberGoal.name.slice(13))) memberGoal.setName(`Member Goal Reached!`);
});