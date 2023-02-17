const { Events } = require('discord.js');
const hourly = require('../functions/hourly.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		size = client.guilds.cache.size;
		client.user.setPresence({ activities: [{ name: `/help | ${size} servers`, type: 3 }], status: 'online' });
		hourly.execute(client);
	},
};