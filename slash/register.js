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

//register global
var commands = [];
var fishing = new SlashCommandBuilder().setName('fishing').setDescription('Category: Activity');
commands.push(fishing.toJSON());
var betray = new SlashCommandBuilder().setName('betray').setDescription('Category: Activity');
commands.push(betray.toJSON());
var poker = new SlashCommandBuilder().setName('poker').setDescription('Category: Activity');
commands.push(poker.toJSON());
var chess = new SlashCommandBuilder().setName('chess').setDescription('Category: Activity');
commands.push(chess.toJSON());
var ytt = new SlashCommandBuilder().setName('ytt').setDescription('Category: Activity');
commands.push(ytt.toJSON());
var rather = new SlashCommandBuilder().setName('wyr').setDescription('Category: Fun');
commands.push(rather.toJSON());
var pickup = new SlashCommandBuilder().setName('pickup').setDescription('Category: Fun');
commands.push(pickup.toJSON());
var roast = new SlashCommandBuilder().setName('roast').setDescription('Category: Fun');
commands.push(roast.toJSON());
var joke = new SlashCommandBuilder().setName('joke').setDescription('Category: Fun');
commands.push(joke.toJSON());
var riddle = new SlashCommandBuilder().setName('riddle').setDescription('Category: Fun');
commands.push(riddle.toJSON());
var quote = new SlashCommandBuilder().setName('quote').setDescription('Category: Random');
commands.push(quote.toJSON());
var help = new SlashCommandBuilder().setName('help').setDescription('Category: Misc');
commands.push(help.toJSON());
var ping = new SlashCommandBuilder().setName('ping').setDescription('Category: Tool');
commands.push(ping.toJSON());
var flip = new SlashCommandBuilder().setName('flip').setDescription('Category: Random');
commands.push(flip.toJSON());
var dice = new SlashCommandBuilder().setName('dice').setDescription('Category: Random').addIntegerOption(option =>
		option.setName('sides').setDescription('E.g. 6').setRequired(true));
commands.push(dice.toJSON());
var ball = new SlashCommandBuilder().setName('8ball').setDescription('Category: Random').addStringOption(option =>
		option.setName('question').setDescription('E.g. will it rain tomorrow?').setRequired(true));
commands.push(ball.toJSON());
var decide = new SlashCommandBuilder().setName('decide').setDescription('Category: Random').addStringOption(option =>
		option.setName('options').setDescription('E.g. go jogging, watch movie, play games').setRequired(true));
commands.push(decide.toJSON());
var cmd = new SlashCommandBuilder().setName('eval').setDescription('Category: Dev').addStringOption(option =>
		option.setName('code').setDescription('E.g. console.log("debug")').setRequired(true));
commands.push(cmd.toJSON());
var whois = new SlashCommandBuilder().setName('whois').setDescription('Category: Tool').addStringOption(option =>
		option.setName('domain').setDescription('E.g. google.com').setRequired(true));
commands.push(whois.toJSON());
var ip = new SlashCommandBuilder().setName('ip').setDescription('Category: Tool').addStringOption(option =>
		option.setName('domain').setDescription('E.g. google.com').setRequired(true));
commands.push(ip.toJSON());
var mc = new SlashCommandBuilder().setName('mc').setDescription('Category: Tool').addStringOption(option =>
		option.setName('domain').setDescription('E.g. 2b2t.org').setRequired(true));
commands.push(mc.toJSON());
var encode = new SlashCommandBuilder().setName('encode').setDescription('Category: Tool').addStringOption(option =>
		option.setName('type').setDescription('E.g. b64').addChoice('url', 'url').addChoice('b64', 'b64').addChoice('bin', 'bin').addChoice('hex', 'hex').setRequired(true)).addStringOption(option =>
		option.setName('string').setDescription('E.g. sample').setRequired(true));
commands.push(encode.toJSON());
var decode = new SlashCommandBuilder().setName('decode').setDescription('Category: Tool').addStringOption(option =>
		option.setName('type').setDescription('E.g. b64').addChoice('url', 'url').addChoice('b64', 'b64').addChoice('bin', 'bin').addChoice('hex', 'hex').setRequired(true)).addStringOption(option =>
		option.setName('string').setDescription('E.g. c2FtcGxl').setRequired(true));
commands.push(decode.toJSON());

console.log("Started refreshing global application (/) commands.");
rest.put(
	Routes.applicationCommands("826031374766440459"),
	{ body: commands },
);
console.log("Successfully reloaded global application (/) commands.");

//register guild
hidden = [];
var debug = new SlashCommandBuilder().setName('debug').setDescription('Category: Dev');
hidden.push(debug.toJSON());

console.log("Started refreshing guild application (/) commands.");
rest.put(
	Routes.applicationGuildCommands("826031374766440459", "726096655614476497"),
	{ body: hidden },
);
console.log("Successfully reloaded guild application (/) commands.");

//delete
/*rest.get(Routes.applicationGuildCommands("826031374766440459", "726096655614476497")).then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands("826031374766440459", "726096655614476497")}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
});*/
