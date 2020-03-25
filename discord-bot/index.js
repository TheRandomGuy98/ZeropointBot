/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const Math = require(`math.js`);
const jsonstore = require(`jsonstore.io`);
const fs = require(`fs`);

/* Local Dependencies */
const bus = require(`./messageBus.js`);

/* Client Config */
let client = new Discord.Client({ disableEveryone: true });
var config = {
	developer: `DamienVesper`,
	developerTag: `4927`,
	superUser: `386940319666667521`,
  developerID: `652273636924719105`,
  dispatcher: null,
	prefix: `z!`,
	token: process.env.DISCORD_BOT_TOKEN,
  jsonstoreToken: process.env.JSONSTORE_TOKEN,
	version: `0.1.8`,
	footer: `© Zeropoint Communiy 2019`
}
config.footer = `© Zeropoint Community 2019 | v${config.version}`;
module.exports = { config };

let store = new jsonstore(config.jsonstoreToken);

/* Client Events */
client.on(`ready`, async () => {
  console.log(`${client.user.username}#${client.user.discriminator} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);
	client.user.setActivity(`with ${client.users.size} members.`);

  let zpcServer = client.guilds.get(`655191199958827017`);
  let memberGoalCN = zpcServer.channels.get(`655456213646966784`);

  zpcServer.channels.get(`655464612174626854`).setName(`Members + Bots: ${zpcServer.memberCount}`);
  zpcServer.channels.get(`655422041985646612`).setName(`Members: ${zpcServer.members.filter(member => !member.user.bot).size}`);
  zpcServer.channels.get(`655464054122479646`).setName(`Bots: ${zpcServer.members.filter(member => member.user.bot).size}`)
  if(memberGoalCN.name != `Member Goal Reached`) if(parseInt(memberGoalCN.name.slice(13)) <= zpcServer.memberCount) memberGoalCN.setName(`Member Goal Reached!`);
  refreshActivity();
});

/* Other Client Events */
let guildMemberAdd = require(`./clientEvents/guildMemberAdd.js`);
let guildMemberRemove = require(`./clientEvents/guildMemberRemove.js`);

/* Client Commands */
client.commands = new Discord.Collection();
fs.readdir(`./discord-bot/commands/`, (err, files) => {
		if(err) console.error(err);

		let jsfiles = files.filter(f => f.split(`.`).pop() == `js`);
		if(jsfiles.length <= 0) return console.log(`No commands to load!`);

		/* Load Commands */
		console.log(`Loading ${jsfiles.length} command(s)!`);
		jsfiles.forEach((f, i) => {
				let props = require(`./commands/${f}`);
				console.log(`${i + 1}: ${f} loaded!`);
				client.commands.set(f.split(`.`)[0], props);
		});
});

/* Client Checks */
const refreshActivity = async() => {
  const botGame = `Zeropoint Community`;
	client.user.setPresence({
			game: {
					name: `${client.users.size} members on ${botGame}`,
					type: `WATCHING`
			},
			status: `dnd`
	});
}
store.read(`music`).then(data => data.isPlaying ? client.commands.get(`summon`).run(client, data.message, [ data.channel ]): null);

//Refresh Activity on Member Event
client.on(`guildMemberAdd`, async member => refreshActivity());
client.on(`guildMemberRemove`, async member => refreshActivity());

//Send Message on Member Event
client.on(`guildMemberAdd`, member => bus.emit(`guildMemberAdd`, member));
client.on(`guildMemberRemove`, member => bus.emit(`guildMemberRemove`, member));

client.on(`message`, async message => {
  /* Botception & Message Handling */
  if(message.author.bot || message.channel.type == `dm`) return;
  if(message.channel.id == `655207475074564096` && message.content != `-agree`) return message.delete();

  if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;

  /* Get Commands & Arguments */
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.channel.name == `counting`) return message.delete();
  else if(message.channel.name.split(``).reverse().slice(0, 8).reverse().join(``) != `commands` && command != `unmute` && command != `purge` && command != `ban` && command != `kick`) return message.delete();

  /* Command Shortcuts */
  if(command == ``) return;
  // else if(command == ``) client.commands.get(``).run(client, message, args);
  else {
    let cmd = client.commands.get(command);
    if(cmd) cmd.run(client, message, args);
    else return;
  }
});

client.login(config.token);