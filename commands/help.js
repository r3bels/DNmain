const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('DN help center');

const embed = new EmbedBuilder()
			.setColor('#97b7e7')
			.setTitle('DN help')
			.addFields(
				{
					name: "/news  <news source>  <additional choices>", 
					value: "Shows the top five articles of the news source. If <additional choices> is set to true, then you will be able to choose a different sub-catagory of that news source"
				},
				{
					name: "/bug_report",
					value: "Lets you submit a form on what is going wrong with the bot"
				},
				{
					name: "/setup", 
					value: "Gives details on the commands used to set up the bot. Can only be used by members that can manage channels"
				}
			)
			.setFooter({ text: 'Daily News', iconURL: 'https://cdn.discordapp.com/avatars/886712614346952774/aee0f20d0a24361cbb1d75a33a292282.png?size=512' })
			.setTimestamp();

module.exports = {
	data: data,
	async execute(interaction) {
		await interaction.reply({embeds: [embed]});
	},
};