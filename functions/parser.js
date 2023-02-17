const { EmbedBuilder } = require('discord.js');
const DOMparser = require('advanced-html-parser');
const fetch = require("@replit/node-fetch")

// returns the embed of the parse url
async function parse(url) {
	return fetch(url).then(res => res.text()).then(async data => {
		let html = await DOMparser.parse(data);
		let items = html.querySelectorAll("item"); //the articles are listed in the list

		let sourceTitle = html.querySelector('title').children[0].data;
		let sourceURL = html.querySelector('link').children[0].data;
		let sourceImage = html.querySelector('image')?.querySelector('url').children[0].data;
		let fields = [];

		// parsing the data - DO NOT touch
		for (let i = 0; i < (items.length < 5 ? items.length : 5); i++) {
			let desc = items[i].querySelector("description")?.children[0].data;
			fields.push({ name: "\u200b", value: `[__**${items[i].querySelector("title").children[0].data}**__](${items[i].querySelector("link").children[0].data})\n${desc ?? ""}` });
		}

		// embed
		let embed = new EmbedBuilder()
			.setColor('#97b7e7')
			.setTitle(`${sourceTitle} - Top 5 Stories`)
			.setURL(sourceURL)
			.setFields(fields)
			.setFooter({ text: 'Daily News', iconURL: 'https://cdn.discordapp.com/avatars/886712614346952774/aee0f20d0a24361cbb1d75a33a292282.png?size=512' })
			.setTimestamp();
		if (sourceImage){embed.setThumbnail(sourceImage);}
		return embed;
	}).catch((err) => {
		console.error(err);
	});
}

module.exports = {
	parse: parse
}