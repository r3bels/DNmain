const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildCreate,
	async execute(guild) {
		channel = guild.systemChannel;
		client = guild.client;
		size = client.guilds.cache.size;
		client.user.setActivity(`/help | ${size} servers`, {type: 3});
		try {
			channel.send("Thank you for inviting me! Type '/help' for help and '/setup' to get started!");
		} catch (err) {
			console.log(err);
		}
	},
};