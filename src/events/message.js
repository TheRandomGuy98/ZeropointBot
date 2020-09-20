const User = require(`../models/user.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

const { calculateExp } = require(`../../config/functions.js`);

client.on(`message`, async message => {
    const m = `${message.author} » `;

    if(!message.author.bot && !message.member.roles.some(r => [`ENFORCEMENT TIME`, `Founder`, `Staff`, `Security`].includes(r.name))) {
        if(message.content.toLowerCase().split(` `).some(f => f == config.bannedWords)) {
            message.delete();
            message.author.send(`${m} That word is blacklisted in this guild!`).catch(err => console.log(`Failed to warn ${message.author.tag} of their punishment, their DMs are not open.`));
        }
        let invregx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discord\.com))/g;
        if(invregx.test(message.content.toLowerCase().replace(/\s+/g, ``))) {
            message.delete();
            message.author.send(`${m} Invite links are blacklisted in this guild!`).catch(err => console.log(`Failed to warn ${message.author.tag} of their punishment, their DMs are not open.`));
        }
    }

    /* Botception */
    if(message.author.bot || message.channel.type == `dm`) return;

    let dbUser = await User.findOne({ discordID: message.author.id });
    if(dbUser && new Date - new Date(dbUser.cooldowns.xp) >= config.cooldowns.xp) {
        let xpGain = Math.floor((Math.random() * 20) + 10);
        dbUser.xp += xpGain;
        dbUser.stats.messageCount++;
        dbUser.cooldowns.xp = new Date();

        let xpToNextLevel = Math.floor(((100 * Math.E * dbUser.level)) + 250);
        if(dbUser.xp > xpToNextLevel) {
            dbUser.level++;

            let levelRoles = [1, 5, 10, 15, 25, 30, 40, 50];
            if(levelRoles.includes(dbUser.level)) config.roles.levels.forEach(f => message.member.roles.has(f) ? message.member.removeRole(f): null);
            switch(dbUser.level) {
                case 1: message.member.addRole(config.roles.levels[0]); break;
                case 5: message.member.addRole(config.roles.levels[1]); break;
                case 10: message.member.addRole(config.roles.levels[2]); break;
                case 15: message.member.addRole(config.roles.levels[3]); break;
                case 25: message.member.addRole(config.roles.levels[4]); break;
                case 30: message.member.addRole(config.roles.levels[5]); break;
                case 40: message.member.addRole(config.roles.levels[6]); break;
                case 50: message.member.addRole(config.roles.levels[7]); break;
            }

            let sEmbed = new Discord.RichEmbed()
                .setAuthor(`Rank Up!`, message.author.avatarURL)
                .setColor(0xffa500)
                .setDescription(`${message.author} You have ranked up to level **${dbUser.level}**!`)
                .setTimestamp(new Date())
                .setFooter(config.footer);
            message.channel.send(sEmbed);
        }
        dbUser.save();
    }

    /* Message Handling */
    if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;

    /* Get Commands & Arguments */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* Validate Commands */
    let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(!cmd || command === ``) return;
    else if((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${m} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {
        try {
            let dbUser = await User.findOne({ discordID: message.author.id });
            if(!dbUser && (command != `help` && command != `verify`)) return message.channel.send(`${m} Please \`${config.prefix}verify\` yourself before using any other commands!`);

            console.log(`\x1b[35m`, `${message.author.tag} ran command ${command} in ${message.guild.name} [${message.guild.id}].`);
            console.log(`\x1b[37m`);
            cmd.run(client, message, args);
        }
        catch(err) {
            console.log(`\x1b[31m`, `There was an error executing command ${command} by ${message.author.tag}.`);
            console.log(`\x1b[37m`);
            console.error(err);
        }
    }
});