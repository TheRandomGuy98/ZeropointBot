import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../typings/discord';

import { cleanse, fetchMemberID, fetchMember } from '../../utils/functions';
import log from '../../utils/log';

const cmd: CommandConfig = {
    desc: `Ban a user.`,
    usage: `<user> [reason]`,
    category: `moderation`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const banMember: Discord.GuildMember = await fetchMember(message, args, await fetchMemberID(message, args));

    if (!message.member.permissions.has(`BAN_MEMBERS`)) return await message.reply(`You can't use that!`);
    else if (!banMember) return await message.reply(`That person is not a member of the server!`);

    else if (banMember.id === message.author.id) return await message.reply(`You cannot ban yourself!`);
    else if (!banMember.bannable || banMember.roles.cache.some(role => role.name.includes(`Staff`))) return await message.reply(`I cannot ban that user!`);

    args.shift();

    const banReason = args.join(` `) || `No reason provided.`;

    banMember.send(`You were banned from **${message.guild.name}** for ${cleanse(banReason)}.`).catch(() => log(`red`, `Could not DM ${banMember.user.tag} their ban reason.`));
    banMember.ban({ reason: banReason }).then(async () => {
        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Member Banned | ${banMember.user.tag}`, message.author.avatarURL())
            .setColor(config.colors.red)
            .setDescription(`**Reason:** ${banReason}\n**Responsible Moderator:** ${message.author.tag}`)
            .setFooter(config.footer);

        message.delete();
        return await message.reply({ embeds: [sEmbed] });
    });
};

export {
    cmd,
    run
};
