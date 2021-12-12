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

	if (interaction.commandName === 'debug') {
		const row = new MessageActionRow().addComponents(
			new MessageButton().setDisabled(true)
				.setCustomId('primary')
				.setLabel('🧭')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: 'Debug', components: [row] });
	}else if (interaction.commandName === 'invite') {
		interaction.reply({ content: 'https://dsc.gg/qubit' });
	}else if (interaction.commandName === 'project') {
		interaction.reply({ content: 'https://github.com/Mini-Ware/Qubit' });
	}else if (interaction.commandName === 'quote') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('☀️')
				.setStyle('PRIMARY'),
		);
		const quotemsg = all.getRandomQuote();
		interaction.reply({ content: quotemsg["quote"]+" -"+quotemsg["author"], components: [row] });
	}else if (interaction.commandName === 'riddle') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🧠')
				.setStyle('PRIMARY'),
		);
		const riddlemsg = all.getRandomRiddle();
		interaction.reply({ content: "Q: "+riddlemsg["riddle"]+"\nA: ||"+riddlemsg["answer"]+"||", components: [row] });
	}else if (interaction.commandName === 'joke') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🤡')
				.setStyle('PRIMARY'),
		);
		const jokenum = Math.floor(Math.random()*collection.joke.length);
		const jokemsg = collection.joke[jokenum];
		interaction.reply({ content: jokemsg, components: [row] });
	}else if (interaction.commandName === 'roast') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🔥')
				.setStyle('PRIMARY'),
		);
		const roastnum = Math.floor(Math.random()*collection.roast.length);
		const roastmsg = collection.roast[roastnum];
		interaction.reply({ content: roastmsg, components: [row] });
	}else if (interaction.commandName === 'pickup') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('💖')
				.setStyle('PRIMARY'),
		);
		const pickupnum = Math.floor(Math.random()*collection.pickup.length);
		const pickupmsg = collection.pickup[pickupnum];
		interaction.reply({ content: pickupmsg, components: [row] });
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
	}else if (interaction.commandName === 'dice') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🎲')
				.setStyle('PRIMARY'),
		);
		var range = interaction.options.getInteger('sides');
		var plot = Math.floor(Math.random()*range)+1;
		interaction.reply({ content: plot.toString(), components: [row] });
	}else if (interaction.commandName === '8ball') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🔮')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('question'), components: [row] });
                var outcome = ["It is certain", 
                   "It is decidedly so", 
                   "Without a doubt", 
                   "Yes, definitely",
                   "As I see it, yes", 
                   "Most likely", 
                   "Yes",  
                   "My reply is no",
                   "My sources say no", 
                   "Very doubtful"];
    		const ask = Math.floor(Math.random()*outcome.length);
		interaction.followUp(outcome[ask]);
	}else if (interaction.commandName === 'decide') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('💡')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('options'), components: [row] });
                var list = interaction.options.getString('options').split(",");
		    var option = Math.floor(Math.random()*list.length);
		    var checkloop = 0;
		    try{
		    while (checkloop <= list.length){
		      if (list[checkloop].replace(/ /g, "") == ""){
			interaction.followUp("Sorry, please provide at least one argument");
			return;
		      }
		      checkloop = checkloop+1;
		    }
		    }catch(err){}
		    interaction.followUp(list[option]);
	}else if (interaction.commandName === 'eval') {
		var exec = interaction.options.getString('code');
		client.emojis.cache.forEach(emoji => {
		  if (exec.search(":"+emoji.name+":") != -1 && (exec.search("<") == -1 && exec.search(">") == -1)){
		    exec = exec.replace(new RegExp(":"+emoji.name+":", "g"), emoji.toString());
		  }
		});
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('📟')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: exec, components: [row] });
                  try {
		      eval(exec);
		  } catch (err) {
		      if (err){
			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('⚠️')
					.setStyle('PRIMARY'),
			);
		      interaction.followUp({ content: "Sorry, an error has occurred", components: [row] });
		      return;
		    }
		  }
	}
});
