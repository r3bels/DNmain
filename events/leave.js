const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildDelete,
	async execute(guild) {
		client = guild.client;
		size = client.guilds.cache.size;
		client.user.setActivity(`/help | ${size} servers`, {type: 3});
  },
};