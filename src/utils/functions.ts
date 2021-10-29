import Discord from 'discord.js';

/**
 * Escape Discord's formatting in a string.
 * @param str The string to cleanse.
 * @returns string
 */
const cleanse = (str: string): string => {
    return str
        .replace(`\`\`\``, `\\\`\\\`\\\``)
        .replace(`\``, `\\\``)
        .replace(`||`, `\\|\\|`)
        .replace(`_`, `\\_`)
        .replace(`***`, `\\*\\*\\*`)
        .replace(`**`, `\\*\\*`)
        .replace(`*`, `\\*`);
};

/**
 * Fetch a member's ID.
 * @param message The message used to invoke the command.
 * @param args The arguments used in the command.
 * @returns Promise<string>
 */
const fetchMemberID = async (message: Discord.Message, args: string[]): Promise<string | null | undefined> => {
    return ((message?.mentions?.members?.first()) != null)
        ? message.mentions.members?.first()?.id
        : args[0] != null
            ? args[0]
            : null;
};

/**
 * Fetch a member from the data supplied.
 * @param message The message used to invoke the command.
 * @param args The arguments used in the command.
 * @returns Promise<Discord.GuildMember>
 */
const fetchMember = async (message: Discord.Message, args: string[], id: string): Promise<Discord.GuildMember | undefined> => {
    const members = await message.guild?.members?.fetch();
    if (members === undefined) return undefined;
    else {
        members.find(member => {
            return member.user.username === args[0] ||
                member.nickname === args[0] ||
                member.id === args[0] ||
                member.id === id;
        });
    }
};

export {
    cleanse,
    fetchMemberID,
    fetchMember
};
