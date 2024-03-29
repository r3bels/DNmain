const parser = require('./parser.js');
const ids = require("../loadFiles/ids.json");
const { PermissionsBitField } = require('discord.js');

module.exports = {
	execute(clientArg) {
		let date = new Date(Date.now());
		let current = date.getTime();
		let nextHour = date.setHours(date.getHours() + 1, 0, 0, 0);
		let waitTime = nextHour - current;

		console.log(waitTime + "ms until the starting hour");

		async function hourly(client) {
			console.log("Hourly");
			for (source of Object.values(ids)) {
				let ids = source['ids'];
				parser.parse(source['link']).then(embed => {
					for (id of ids) {
						try {
							client?.channels.fetch(id).then(channel => {
								console.log("Point: F_H_1");
								let perms = channel.guild.members.me.permissionsIn(channel);
								try {
									if (perms.has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages])) {
										channel.send({ embeds: [embed] });
									}
								} catch (err) { console.log(err); console.log(perms.serialize()) };
							}).catch(err => { console.log("top level"); console.log(err) });
						} catch (err) {console.log(err); console.log('temp fix point')}
					}
				});
			}
		}

		setTimeout(() => {
			hourly(clientArg);
			setInterval(hourly, 3600000)
		}, waitTime)
	}
}