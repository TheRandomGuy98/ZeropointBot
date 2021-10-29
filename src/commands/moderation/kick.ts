import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd: CommandConfig = {
    desc: `Kick a user.`,
    usage: `<user> [reason]`,
    category: `moderation`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const kickMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`KICK_MEMBERS`)) return await message.reply(`ou can't use that!`);
    else if (!kickMember) return await message.reply(`That person is not a member of the server!`);

    else if (kickMember.id === message.author.id) return await message.reply(`You cannot kick yourself!`);
    else if (!kickMember.kickable || kickMember.roles.cache.some(role => role.name.includes(`Staff`))) return await message.reply(`I cannot kick that user!`);

    args.shift();
    const kickReason = args.join(` `) || `No reason provided.`;

    kickMember.send(`You were kicked from **${message.guild.name}** for ${cleanse(kickReason)}.`).catch(() => log(`red`, `Could not DM ${kickMember.user.tag} their kick reason.`));
    kickMember.kick(kickReason).then(async () => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Kicked | ${kickMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Reason:** ${kickReason}\n**Responsible Moderator:** ${message.author.tag}`)
            .setFooter(config.footer);

        message.delete();
        return await message.reply({ embeds: [sEmbed] });
    });
};

export {
    cmd,
    run
};
