const parser = require('./parser.js');
const ids = require("../loadFiles/ids.json");

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
						client.channels.fetch(id).then(channel => {
							channel.send({ embeds: [embed] });
						}).catch(err => console.log(err));
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