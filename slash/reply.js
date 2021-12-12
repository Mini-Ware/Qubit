const dotenv = require("dotenv");
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client({
	allowedMentions: { parse: ['users'] },
	intents: [
		'GUILDS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_INTEGRATIONS',
		'GUILD_INVITES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGE_TYPING',
	],
});
client.login(process.env.TOKEN);

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'test') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🧪')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: 'For testing purposes', components: [row] });
	}else if (interaction.commandName === 'ping') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🏓')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: "Websocket: "+client.ws.ping+"ms", components: [row] });
	}else if (interaction.commandName === 'flip') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🪙')
				.setStyle('PRIMARY'),
		);
		var land = Math.floor(Math.random()*2)
		if (land == 1){
		  interaction.reply({ content: "Heads", components: [row] });
		}else{
		  interaction.reply({ content: "Tails", components: [row] });
		}
	}
});
