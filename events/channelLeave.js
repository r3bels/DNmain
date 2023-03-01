const { Events } = require('discord.js');
const { writeFile } = require("node:fs");
const ids = require("../loadFiles/ids.json");


module.exports = {
	name: Events.ChannelDelete,
	async execute(channel) {
		let channelId = channel.id;
		for (source of Object.values(ids)){
			let ids = source['ids'];
			let index = ids.indexOf(channelId);
			if (index != -1){
				ids.splice(index, 1);
			}
		}
		writeFile('./loadFiles/ids.json', JSON.stringify(ids), (err) => { if (err) {console.log(err)} });
  }
};