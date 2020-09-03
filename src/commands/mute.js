const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `mute`,
    description: `Mute a user.`,
    usage: `<user> [reason]`,
    aliases: null,
    category: `moderation`
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    if(!config.developerIDs.includes(message.author.id) && !message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`${m} You can't use that!`);

    let muteMember;
    if(args[0]) {
        muteMember = message.mentions.members.first();
        if(!muteMember) {
            muteMember = args[0];
            if(isNaN(parseInt(muteMember))) return message.channel.send(`${m} That is an invalid user ID!`);
            muteMember = await message.guild.members.get(muteMember);
        }
    }

    if(!muteMember && isNaN(parseInt(args[0]))) return message.channel.send(`${m} Please specify a valid member of this server!`);
    else if(config.developerIDs.includes(muteMember.id) || (muteMember.roles.some(r => [`ENFORCEMENT TIME`, `Founder`, `Staff`, `Security`].includes(r.name)))) return message.channel.send(`${message.author} That user is a mod / admin.`);
    else if(muteMember.roles.has(config.roles.muted)) return message.channel.send(`${m} This user is already muted!`);

    let muteReason = args.slice(1).join(` `) || `No reason provided.`;
    muteMember.send(`You were muted in **${message.guild.name}** for **${muteReason}**.`).catch(err => console.log(err));

    muteMember.removeRole(config.roles.member);
    muteMember.addRole(config.roles.muted);

    message.delete();
    message.channel.send(`**${muteMember.user.tag}** was muted: **${muteReason}**.`);
}