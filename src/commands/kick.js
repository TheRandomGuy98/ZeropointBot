const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `kick`,
    description: ``,
    usage: null,
    aliases: null
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    if(!config.developerIDs.includes(message.author.id) || message.member.hasPermission(`kick_MEMBERS`)) return message.channel.send(`${m} You can't use that!`);

    let kickMember;
    if(args[0]) {
        kickMember = message.mentions.members.first();
        if(!kickMember) {
            kickMember = args[0];
            if(isNaN(parseInt(kickMember))) return message.channel.send(`${m} That is an invalid user ID!`);
            kickMember = await message.guild.members.get(kickMember);
        }
    }

    if(!kickMember) return message.channel.send(`${m} Please specify a valid member of this server!`);
    else if(!config.developerIDs.includes(kickMember.id) || kickMember.kickable || kickMember.hasPermission(`MANAGE_SERVER`) || (kickMember.roles.some(r => [`ENFORCEMENT TIME`, `Founder`, `Manager`, `Staff`].includes(r.name)))) return message.channel.send(`${message.author} That user is a mod / admin.`);

    let kickReason = args.slice(1).join(` `) || `No reason provided.`;

    kickMember.send(`You were kicked from **${message.guild.name}** for **${kickReason}**.`).catch(err => console.log(err));

    await kickMember.kick(kickReason).catch(err => {
        message.channel.send(`Failed to kick ${kickMember}. Please contact a developer.`);
        console.error(err);
    }).then(() => {
        message.channel.send(`**${kickMember.user.tag}** was kicked: **${kickReason}**.`);
    });
}