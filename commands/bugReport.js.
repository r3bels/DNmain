const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, bold } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName("bug_report")
	.setDescription('report what is going wrong with the bot')

// make modal base
const modal = new ModalBuilder()
	.setCustomId('bugReport')
	.setTitle('Bug Report')

// create model component
const reportInput = new TextInputBuilder()
	.setCustomId('bugReportInput')
	.setLabel("What bug/problem is the bot having")
	.setStyle(TextInputStyle.Paragraph)
	.setRequired(true);

// create and add the action row
const actionRow = new ActionRowBuilder().addComponents(reportInput);
modal.addComponents(actionRow);

const embed = new EmbedBuilder()
	.setColor('#97b7e7')
	.setFooter({ text: 'Daily News', iconURL: 'https://cdn.discordapp.com/avatars/886712614346952774/aee0f20d0a24361cbb1d75a33a292282.png?size=512' })
	.setTimestamp();

module.exports = {
	data: data,
	async execute(interaction) {
		await interaction.showModal(modal);
		// Collect a modal submit interaction
		interaction.awaitModalSubmit({ time: 60000 })
			.then(modalInteraction => {
				let submission = modalInteraction.components[0].components[0].value;
				let user = modalInteraction.user;
				embed.setDescription(`${bold(`Bug report from ${user}`)}\n${submission}`);
				modalInteraction.reply("Your report was successfully submitted!");
				reportChannel.send({embeds: [embed]});
			})
			.catch(console.error);
	},
};