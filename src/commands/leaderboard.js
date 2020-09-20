const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);
const { getLeaderboard } = require(`../../config/functions`);

module.exports = {
    name: `leaderboard`,
    description: `View the global leaderboard.`,
    usage: null,
    aliases: [`lb`, `board`, `top`]
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    let lb = await getLeaderboard();

    let memRank;
    lb.forEach((f, i) => f.id == message.author.id ? memRank = i: null);

    let lbTxt = ``;
    for(let i = 0; i < (lb.length < 10 ? lb.length: 10); i++) {
        const { id, level, xp } = lb[i];
        const lbUser = client.users.get(id);

        lbTxt += `${i == 0 ? `🥇`: i == 1 ? `🥈`: i == 2 ? `🥉`: `🏅`} - **${lbUser.tag}** - LVL ${level}\n`;
    }
    if(memRank > 10) lbTxt += `🎖️ - **YOU** - LVL ${level}\n`;

    let sEmbed = new Discord.RichEmbed()
        .setColor(0x1e90ff)
        .setAuthor(`Global Leaderboard`)
        .setDescription(lbTxt)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    return message.channel.send(sEmbed);
}