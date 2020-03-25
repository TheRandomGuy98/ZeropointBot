const Discord = require(`discord.js`);
const { config, client } = require(`../index.js`);
const bus = require(`../messageBus.js`);

bus.on(`guildMemberRemove`, member => {
//   let zpcServer = member.guild;
//   let memberGoalCN = zpcServer.channels.get(`655456213646966784`);

//   zpcServer.channels.get(`655464612174626854`).setName(`Members + Bots: ${zpcServer.memberCount}`);
//   zpcServer.channels.get(`655422041985646612`).setName(`Members: ${zpcServer.members.filter(member => !member.user.bot).size}`);
//   zpcServer.channels.get(`655464054122479646`).setName(`Bots: ${zpcServer.members.filter(member => member.user.bot).size}`)
//   if(memberGoalCN.name != `Member Goal Reached`) if(parseInt(memberGoalCN.name.slice(13)) <= zpcServer.memberCount) memberGoalCN.setName(`Member Goal Reached!`);
});