const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('DN setup help')
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

const embed = new EmbedBuilder()
			.setColor('#97b7e7')
			.setTitle('DN setup help')
			.addFields(
				{name: "/hourly_set  <news source>  <channel>", value: "Starts hourly posting the news source to the specified channel"},
				{name: "/hourly_remove  <news source>  <channel>", value: "Stops hourly posting the news source to the specified channel"}
			)
			.setFooter({ text: 'Daily News', iconURL: 'https://cdn.discordapp.com/avatars/886712614346952774/aee0f20d0a24361cbb1d75a33a292282.png?size=512' })
			.setTimestamp();

module.exports = {
	data: data,
	async execute(interaction) {
		console.log("Point: C_S_1")
		await interaction.reply({embeds: [embed]});
	},
};