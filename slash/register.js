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

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v8');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

var test = new SlashCommandBuilder().setName('test').setDescription('For testing purposes');
var commands = [test.toJSON()];

//create
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands("826031374766440459", "726096655614476497"),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

//delete
/*rest.get(Routes.applicationGuildCommands("826031374766440459", "726096655614476497")).then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands("826031374766440459", "726096655614476497")}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
});*/
