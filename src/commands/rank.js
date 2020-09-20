const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);
const { standardize, calculateExp, getLeaderboard } = require(`../../config/functions.js`);

module.exports = {
    name: `rank`,
    description: `View a user's rank.`,
    usage: `[user]`,
    aliases: null
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    let lb = await getLeaderboard();

    let rankMember;
    if(args[0]) {
        rankMember = message.mentions.members.first();
        if(!rankMember) {
            rankMember = args[0];
            if(isNaN(parseInt(rankMember))) return message.channel.send(`${m} That is an invalid user ID!`);
            rankMember = await message.guild.members.get(rankMember);
        }
    }
    else rankMember = message.member;

    let memRank;
    for(let i in lb) lb[i].id == rankMember.user.id ? memRank = (parseInt(i) + 1): null;

    let dbUser = await User.findOne({ discordID: rankMember.user.id });
    let sEmbed = new Discord.RichEmbed()
        .setAuthor(`#${memRank} | ${rankMember.user.tag}`, rankMember.user.avatarURL)
        .setColor(0x1e90ff)
        .setDescription(`
        Level: **${dbUser.level}**
        XP: **${standardize(dbUser.xp)}** / **${standardize(calculateExp(dbUser.level))}**

        Messages: **${dbUser.stats.messageCount}**
        `)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    return message.channel.send(sEmbed);
}