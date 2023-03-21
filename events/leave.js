const { Events } = require('discord.js');
const { writeFile } = require("node:fs");
const ids = require("../loadFiles/ids.json");

module.exports = {
	name: Events.GuildDelete,
	async execute(guild) {
		client = guild.client;
		size = client.guilds.cache.size;
		client.user.setActivity(`/help | ${size} servers`, { type: 3 });
		// removing channels from ids.json
		// for (source of Object.values(ids)){
		// 	let ids = source['ids'];
		// 	console.log(ids)
		// 	if (index != -1){
		// 		ids.splice(index, 1);
		// 	}
		// }
		// writeFile('./loadFiles/ids.json', JSON.stringify(ids), (err) => { if (err) {console.log(err)} });
	},
};