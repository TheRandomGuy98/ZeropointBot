import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import log from '../../utils/log';

export default async (client: Client, interaction: Discord.Interaction) => {
    // No DM channels.
    if (interaction.channel.type === `DM`) return;

    // Only check commands.
    if (!interaction.isCommand()) return;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    log(`magenta`, `${interaction.user.tag} [${interaction.user.id}] ran command ${interaction.commandName} in ${interaction.guild.name}.`);
    cmd.run(interaction);
};
