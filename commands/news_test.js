const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require('discord.js');
const { parse } = require('../functions/parser.js');
const sources = require('../rss.json');
const defaults = require('../loadFiles/ids.json');
const names = Object.keys(sources);

const data = new SlashCommandBuilder()
	.setName('news')
	.setDescription('Sends a preferred news article!')
	.addStringOption(option =>
		option.setName('source')
			.setDescription('The news category')
			.setRequired(true)
	)
	.addBooleanOption(option =>
		option.setName('additional_options')
			.setDescription('Show more source pages to choose from')
	);

// gets all of the source names from rss.json and adds those as choices
for (let i = 0; i < names.length; i++) {
	data.options[0].addChoices({ name: names[i], value: names[i] });
}

module.exports = {
	data: data,
	async execute(interaction) {
		await interaction.deferReply();
		// adds the source options to the specified source
		let source = interaction.options.getString("source");
		let newsSources = sources[source];
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('specifiedSource')
					.setPlaceholder('No source')
			);
		for (let newsSource in newsSources) {
			row.components[0].addOptions({ label: newsSource, value: newsSources[newsSource] });
		}

		// sends the message
		if (!interaction.options.getBoolean("additional_options")) {
			// no additional source choice
			parse(defaults[source].link).then(embed => {
				if (embed == undefined) {
					interaction.followUp("Could not parse this source")
				} else {
					interaction.followUp({ embeds: [embed] })
				}
			});
		} else {
			await interaction.followUp({ content: `Sending news from ${source}`, components: [row] });
			let message = await interaction.fetchReply();

			// gets the data from the select menu and does stuff with it
			message.awaitMessageComponent({ ComponentType: ComponentType.StringSelect, time: 20000 }).then(interaction => {
				parse(interaction.values[0]).then(embed => {
					if (embed == undefined) {
						interaction.update({ content: "Could not parse this source", components: [] });
					} else {
						interaction.update({ embeds: [embed], components: [] });
					}

				}).catch(err => {
					interaction.update({ content: "Could not parse this source", components: [] });
					console.error(err);
				});
			}).catch(err => {
				interaction.editReply({ content: "No source was selected", components: [] });
			});
		}
	},
}