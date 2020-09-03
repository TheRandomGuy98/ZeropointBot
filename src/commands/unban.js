const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `unban`,
    description: `Unban a user.`,
    usage: `<user>`,
    aliases: null,
    category: `moderation`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    if(!config.developerIDs.includes(message.author.id) && !message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);

    let unbanMember;
    if(args[0]) {
        unbanMember = message.mentions.members.first();
        if(!unbanMember) {
            unbanMember = args[0];
            if(isNaN(parseInt(unbanMember))) return message.channel.send(`${m} That is an invalid user ID!`);
        }
    }

    let bans = await message.guild.fetchBans();
    unbanMember = bans.find(user => user.id == unbanMember.id);
    let reason = args.slice(1).join(` `);

    if(unbanMember) {
        message.guild.members.unban(`${unbanMember.id}`, `${reason}`);
        message.channel.send(`Succesfully unbanned **${unbanMember.user.tag}**.`);
    }
}