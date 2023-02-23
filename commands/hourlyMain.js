const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { writeFile } = require("node:fs");
const ids = require('../loadFiles/ids.json');
const names = Object.keys(ids);

const data = new SlashCommandBuilder()
	.setName("hourly")
	.setDescription("Manages the channels that hourly news gets posted to")
	.addSubcommand(subCommand =>
		subCommand
			.setName('set')
			.setDescription('Sets the channel to post a source of hourly news')
			.addStringOption(option =>
				option.setName('news_source')
					.setDescription('The news category for hourly news')
					.setRequired(true)
			)
			.addChannelOption(option =>
				option.setName('channel')
					.setDescription('The channel to post hourly news to')
					// Ensure the user can only select a TextChannel for output
					.addChannelTypes(ChannelType.GuildText)
					.setRequired(true)
			)
	)
	.addSubcommand(subCommand =>
		subCommand
			.setName('remove')
			.setDescription('Stops hourly posting the specified source to a channel')
			.addStringOption(option =>
				option.setName('news_source')
					.addChoices({ name: "all", value: "all" })
					.setDescription('The news category for hourly news')
					.setRequired(true)
			)
			.addChannelOption(option =>
				option.setName('channel')
					.setDescription('The channel to remove')
					// Ensure the user can only select a TextChannel for output
					.addChannelTypes(ChannelType.GuildText)
					.setRequired(true)
			)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

// gets all of the source names from rss.json and adds those as choices
for (let i = 0; i < names.length; i++) {
	data.options[0].options[0].addChoices({ name: names[i], value: names[i] });
	data.options[1].options[0].addChoices({ name: names[i], value: names[i] });
}

async function set(interaction) {
	let channel = interaction.options.getChannel("channel");
	let newsSource = interaction.options.getString("news_source");
	let channelId = channel.id;
	let channelIds = ids[newsSource].ids;
	if (channelIds.includes(channelId)) {
		await interaction.reply(`The hourly news for ${newsSource} is already set for ${channel}`);
	} else {
		// checking to test that the bot has the permissions to post to the bot
		try {
			channel.send("testing");
		} catch (err) {
			await interaction.reply(`Could not post to ${newsSource}, check that the bot has the permissions to view and post to ${newsSource}`);
			return;
		}
		
		// adding the channel to ids.json
		channelIds.push(channelId);
		writeFile('./loadFiles/ids.json', JSON.stringify(ids), (err) => { if (err) { console.log(err) } });
		await interaction.deferReply();
		await interaction.followUp(`Setting channel ${channel} for ${newsSource}`);
	}
}

async function remove(interaction) {
	let channel = interaction.options.getChannel("channel");
	let newsSource = interaction.options.getString("news_source");
	let channelId = channel.id;
	if (newsSource == "all") {
		await interaction.deferReply();
		for (source of names) {
			let channelIds = ids[source].ids;
			let index = channelIds.indexOf(channelId);
			if (index != -1) {
				channelIds.splice(index, 1);
			}
		}
		await interaction.followUp(`Removed all hourly sources from ${channel}`);
		writeFile('./loadFiles/ids.json', JSON.stringify(ids), (err) => { if (err) { console.log(err) } });
	} else {
		let channelIds = ids[newsSource].ids;
		let index = channelIds.indexOf(channelId);
		await interaction.deferReply();
		if (index != -1) {
			channelIds.splice(index, 1);
			await interaction.followUp(`Removed hourly ${newsSource} from ${channel}`);
		} else {
			await interaction.followUp(`${channel} does not have ${newsSource} set`);
		}
		writeFile('./loadFiles/ids.json', JSON.stringify(ids), (err) => { if (err) { console.log(err) } });
	}
}

module.exports = {
	data: data,
	async execute(interaction) {
		if (interaction.options.getSubcommand() == "set") {
			set(interaction);
		} else if (interaction.options.getSubcommand() == "remove") {
			remove(interaction);
		}
	}
}