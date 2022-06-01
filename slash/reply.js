const dotenv = require("dotenv");
dotenv.config();

const google = require('google');
const wyr = require('wyr');
const all = require("everyday-fun");
const status = require('minecraft-server-status-improved');
const fs = require('fs');
var collection = {};
fs.readFile('response.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  eval("collection = "+data);
})

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

client.on('ready', init => {
	client.user.setActivity("/help", {
  type: "STREAMING",
  url: "https://www.twitch.tv/nasa"
  });
});

const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v8');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

client.on('interactionCreate', interaction => {
        try{
		if (!interaction.isCommand() || interaction.channel.type !== 'GUILD_TEXT'){
			return;
		}
	}catch(err){
		return;
	}
	if (interaction.commandName === 'debug') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🧭')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: 'Guilds: '+client.guilds.cache.size+"\nChannels: "+client.channels.cache.size, components: [row] });
	}else if (interaction.commandName === 'icon') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL(interaction.guild.iconURL())
				.setLabel('Download')
				.setStyle('LINK'),
		);
		interaction.reply({ embeds: [{
			title: interaction.guild.name,
			color: '#221C35',
			image: {
				url: interaction.guild.iconURL()
			}
		}], components: [row] });
	}else if (interaction.commandName === 'emoji') {
		var command = interaction.options.getString('emote');
		if (command.search(":") != -1 && command.search(">") != -1 && command.search("<") != -1){
			var emoji = command.split(":");
			var eid = emoji[2].split(">");
			var animated = emoji[0].split("<").reverse().join();
		 	var format = ".png";
			if (animated.startsWith("a")){
				format = ".gif";
			}
			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setURL("https://cdn.discordapp.com/emojis/"+eid[0]+format)
					.setLabel('Download')
					.setStyle('LINK'),
			);
			interaction.reply({ embeds: [{
				title: ":"+emoji[1]+":",
				color: '#221C35',
				image: {
					url: "https://cdn.discordapp.com/emojis/"+eid[0]+format
				}
			}], components: [row] });
		}else{
			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setEmoji('🔍')
					.setStyle('PRIMARY'),
			);
			interaction.reply({ content: "Sorry, no valid emoji could be found", components: [row] })
		}
	}else if (interaction.commandName === 'wyr') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('💭')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: 'Would you rather...', components: [row] });
		wyr().then((response) => {
			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId(interaction.id+":1")
					.setEmoji('🔵')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(interaction.id+":2")
					.setEmoji('🔴')
					.setStyle('PRIMARY'),
			)
			interaction.editReply({ content: "Blue: "+response.blue.question+"\nRed: "+response.red.question, components: [row] });

			const filter = i => (i.customId === interaction.id+":1" || i.customId === interaction.id+":2") && i.user.id === interaction.user.id;

			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

			collector.on('collect', async i => {
				if (i.customId === interaction.id+":1") {
					collector.stop()
					const row = new MessageActionRow().addComponents(
						new MessageButton()
							.setCustomId('blue')
							.setEmoji('🔵')
							.setStyle('SECONDARY'),
						new MessageButton()
							.setCustomId('red')
							.setEmoji('🔴')
							.setStyle('PRIMARY'),
					)
					i.update({ content: "Blue: "+response.blue.question+" ("+(Math.floor((Number(response.blue.votes.replace(/,/g,""))/(Number(response.red.votes.replace(/,/g,""))+Number(response.blue.votes.replace(/,/g,"")))*100)*10)/10).toString()+"%)\nRed: "+response.red.question+" ("+(Math.ceil((Number(response.red.votes.replace(/,/g,""))/(Number(response.red.votes.replace(/,/g,""))+Number(response.blue.votes.replace(/,/g,"")))*100)*10)/10).toString()+"%)", components: [row] });
				}else if (i.customId === interaction.id+":2") {
					collector.stop()
					const row = new MessageActionRow().addComponents(
						new MessageButton()
							.setCustomId('blue')
							.setEmoji('🔵')
							.setStyle('PRIMARY'),
						new MessageButton()
							.setCustomId('red')
							.setEmoji('🔴')
							.setStyle('SECONDARY'),
					)
					i.update({ content: "Blue: "+response.blue.question+" ("+(Math.floor((Number(response.blue.votes.replace(/,/g,""))/(Number(response.red.votes.replace(/,/g,""))+Number(response.blue.votes.replace(/,/g,"")))*100)*10)/10).toString()+"%)\nRed: "+response.red.question+" ("+(Math.ceil((Number(response.red.votes.replace(/,/g,""))/(Number(response.red.votes.replace(/,/g,""))+Number(response.blue.votes.replace(/,/g,"")))*100)*10)/10).toString()+"%)", components: [row] });
				}
			});
		});
	}else if (interaction.commandName === 'spotify') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🎧')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: "Fetching relevant playlists...", components: [row] });
		var mention = "site:open.spotify.com/playlist/ "+interaction.options.getString('query').replace(":", " ");
		google.resultsPerPage = 20;
		var nextCounter = 0;
		google(mention, (err, res) => {
			const parser = res.body.split('<a href="/url?q=');
			var parse = "";
			var list = [];
			var u = 1;
			var now = 0;
			var prev = "";

			while (u < (parser.length-1)){
				parse = parser[u].split('&');
				const Filter = require('bad-words');
				const filter = new Filter();
				if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1 && (interaction.options.getString('query') == filter.clean(interaction.options.getString('query')) || interaction.channel.nsfw == true)){
					list.push(parse[0]);
				}
				prev = parse[0]
				u = u+1;
			}

			if (list.length == 0){
				result = "[Playlist 0/0]\nhttps://www.spotify.com/";
			}else{
				result="[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+list[0];
			}

			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId(interaction.id+":1")
					.setEmoji('🔼')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(interaction.id+":2")
					.setEmoji('🔽')
					.setStyle('PRIMARY'),
			);
			interaction.editReply({ content: result, components: [row] });

			const filter = i => (i.customId === interaction.id+":1" || i.customId === interaction.id+":2") && i.user.id === interaction.user.id;

			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

			collector.on('collect', async i => {
				if (i.customId === interaction.id+":1") {
					if (now+1 > 1){
						now = now-1;
						result=list[now];
						const row = new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId(interaction.id+":1")
								.setEmoji('🔼')
								.setStyle('PRIMARY'),
							new MessageButton()
								.setCustomId(interaction.id+":2")
								.setEmoji('🔽')
								.setStyle('PRIMARY'),
						)
						i.update({ content: "[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result, components: [row] });
					}
				}else if (i.customId === interaction.id+":2") {
					if (now+1 < list.length){
						now = now+1;
						result=list[now];
						const row = new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId(interaction.id+":1")
								.setEmoji('🔼')
								.setStyle('PRIMARY'),
							new MessageButton()
								.setCustomId(interaction.id+":2")
								.setEmoji('🔽')
								.setStyle('PRIMARY'),
						)
						i.update({ content: "[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result, components: [row] });
					}
				}
			});
		});
	}else if (interaction.commandName === 'youtube') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('📺')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: "Fetching relevant videos...", components: [row] });
		var mention = "site:youtube.com/watch "+interaction.options.getString('query').replace(":", " ");
		google.resultsPerPage = 20;
		var nextCounter = 0;
		google(mention, (err, res) => {
			const parser = res.body.split('<a href="/url?q=');
			var parse = "";
			var list = [];
			var u = 1;
			var now = 0;
			var prev = "";

			while (u < (parser.length-1)){
				parse = parser[u].split('&');
				const Filter = require('bad-words');
				const filter = new Filter();
				if (prev != parse[0] && parse[0].search("google")==-1 && (interaction.options.getString('query') == filter.clean(interaction.options.getString('query')) || interaction.channel.nsfw == true)){
					list.push(parse[0]);
				}
				prev = parse[0]
				u = u+1;
			}

			if (list.length == 0){
				result = "[Video 0/0]\nhttps://www.youtube.com/";
			}else{
				result="[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+list[0];
			}

			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId(interaction.id+":1")
					.setEmoji('🔼')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(interaction.id+":2")
					.setEmoji('🔽')
					.setStyle('PRIMARY'),
			);
			interaction.editReply({ content: result.replace("%3F", "?").replace("%3D", "="), components: [row] });

			const filter = i => (i.customId === interaction.id+":1" || i.customId === interaction.id+":2") && i.user.id === interaction.user.id;

			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

			collector.on('collect', async i => {
				if (i.customId === interaction.id+":1") {
					if (now+1 > 1){
						now = now-1;
						result=list[now];
						const row = new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId(interaction.id+":1")
								.setEmoji('🔼')
								.setStyle('PRIMARY'),
							new MessageButton()
								.setCustomId(interaction.id+":2")
								.setEmoji('🔽')
								.setStyle('PRIMARY'),
						)
						i.update({ content: "[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="), components: [row] });
					}
				}else if (i.customId === interaction.id+":2") {
					if (now+1 < list.length){
						now = now+1;
						result=list[now];
						const row = new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId(interaction.id+":1")
								.setEmoji('🔼')
								.setStyle('PRIMARY'),
							new MessageButton()
								.setCustomId(interaction.id+":2")
								.setEmoji('🔽')
								.setStyle('PRIMARY'),
						)
						i.update({ content: "[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="), components: [row] });
					}
				}
			});
		});
	}else if (interaction.commandName === 'wiki') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('📄')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: "Fetching relevant articles...", components: [row] });
		var mention = "site:en.wikipedia.org/wiki/ "+interaction.options.getString('query').replace(":", " ");
		google.resultsPerPage = 20;
		var nextCounter = 0;
		google(mention, (err, res) => {
			const parser = res.body.split('<a href="/url?q=');
			var parse = "";
			var list = [];
			var u = 1;
			var now = 0;
			var prev = "";

			while (u < (parser.length-1)){
				parse = parser[u].split('&');
				const Filter = require('bad-words');
				const filter = new Filter();
				if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1 && (interaction.options.getString('query') == filter.clean(interaction.options.getString('query')) || interaction.channel.nsfw == true)){
					list.push(parse[0]);
				}
				prev = parse[0]
				u = u+1;
			}

			if (list.length == 0){
				result = "[Article 0/0]\nhttps://www.wikipedia.org/";
			}else{
				result="[Article "+(now+1).toString()+"/"+list.length.toString()+"]\n"+list[0];
			}

			const row = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId(interaction.id+":1")
					.setEmoji('🔼')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(interaction.id+":2")
					.setEmoji('🔽')
					.setStyle('PRIMARY'),
			);
			interaction.editReply({ content: result.replace("%3F", "?").replace("%3D", "="), components: [row] });

			const filter = i => (i.customId === interaction.id+":1" || i.customId === interaction.id+":2") && i.user.id === interaction.user.id;

			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

			collector.on('collect', async i => {
				if (i.customId === interaction.id+":1") {
					if (now+1 > 1){
						now = now-1;
						result=list[now];
						const row = new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId(interaction.id+":1")
								.setEmoji('🔼')
								.setStyle('PRIMARY'),
							new MessageButton()
								.setCustomId(interaction.id+":2")
								.setEmoji('🔽')
								.setStyle('PRIMARY'),
						)
						i.update({ content: "[Article "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="), components: [row] });
					}
				}else if (i.customId === interaction.id+":2") {
					if (now+1 < list.length){
						now = now+1;
						result=list[now];
						const row = new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId(interaction.id+":1")
								.setEmoji('🔼')
								.setStyle('PRIMARY'),
							new MessageButton()
								.setCustomId(interaction.id+":2")
								.setEmoji('🔽')
								.setStyle('PRIMARY'),
						)
						i.update({ content: "[Article "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="), components: [row] });
					}
				}
			});
		});
	}else if (interaction.commandName === 'encode') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🔒')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('string'), components: [row] });
		if (interaction.options.getString('type') == "b64"){
			const mention = interaction.options.getString('string');
			var b64 = Buffer.from(mention, 'utf-8').toString('base64');
			if (b64.length > 2000){
				interaction.followUp("Sorry, the output is too large to display")
			}else{
				interaction.followUp(b64);
			}
		}else if (interaction.options.getString('type') == "hex"){
			const mention = interaction.options.getString('string');
			var bhex = Buffer.from(mention, 'utf-8').toString('hex');
			if (bhex.length > 2000){
				interaction.followUp("Sorry, the output is too large to display")
			}else{
				interaction.followUp(bhex.toUpperCase());
			}
		}else if (interaction.options.getString('type') == "bin"){
			const mention = interaction.options.getString('string');
			var n = 0;
			var fullstr = "";
			while (n <= (mention.length-1)){
			    var sus = parseInt(mention.charCodeAt(n)).toString(2);
			    while (sus.length < 8){
			       sus = "0"+sus;
			    }
			    fullstr += sus;
			    n = n+1;
			}
			if (fullstr.length > 2000){
			    interaction.followUp("Sorry, the output is too large to display")
			}else{
			    interaction.followUp(fullstr);
			}
		}else if (interaction.options.getString('type') == "url"){
			const mention = interaction.options.getString('string');
			if (encodeURIComponent(mention).length > 2000){
				interaction.followUp("Sorry, the output is too large to display")
			}else{
				interaction.followUp(encodeURIComponent(mention));
			}
		}else if (interaction.options.getString('type') == "morse"){
			const mention = interaction.options.getString('string');
			const morse = require('morse');
			if (morse.encode(mention).length > 2000){
				interaction.followUp("Sorry, the output is too large to display")
			}else{
				interaction.followUp(morse.encode(mention));
			}
		}
	}else if (interaction.commandName === 'decode') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🔑')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('string'), components: [row] });
		if (interaction.options.getString('type') == "b64"){
			const mention = interaction.options.getString('string');
			interaction.followUp(Buffer.from(mention, 'base64').toString('utf-8'));
		}else if (interaction.options.getString('type') == "hex"){
			if (/^[a-fA-F0-9]+$/.test(interaction.options.getString('string')) == false){
				interaction.followUp("Sorry, please enter a valid hexadecimal string");
			}else{
				const mention = interaction.options.getString('string');
				interaction.followUp(Buffer.from(mention.replace(/ /g, ""), 'hex').toString('utf-8'));
			}
		}else if (interaction.options.getString('type') == "bin"){
			if (/^[0-1]+$/.test(interaction.options.getString('string')) == false){
				interaction.followUp("Sorry, please enter a valid binary string");
			}else{
				const mention = interaction.options.getString('string').replace(/ /g, "");
				var fullstr = "";
				var n = 0;
				var midstr = "";
				var stastr = mention;
				var b = 0;
				var c = 0;
				var a = 0;
				var coolstr = "";
				while (b < Math.round(mention.length/8)){
				  coolstr = coolstr+stastr[a];
				  a = a+1;
				  c = c+1;
				  if (c >= 8){
				    c = 0;
				    b = b+1;
				    coolstr = coolstr+" ";
				  }
				}
				midstr = coolstr.split("").reverse().join("").substr(1).split("").reverse().join("").split(" ");
				while (n <= (midstr.length-1)){
				    fullstr += String.fromCharCode(parseInt(midstr[n], 2))
				    n = n+1;
				}
				interaction.followUp(fullstr);
			}
		}else if (interaction.options.getString('type') == "url"){
			const mention = interaction.options.getString('string');
			interaction.followUp(decodeURIComponent(mention));
		}else if (interaction.options.getString('type') == "morse"){
			if (/^[\-\.]+$/.test(interaction.options.getString('string')) == false){
				interaction.followUp("Sorry, please enter a valid morse code string");
			}else{
				const mention = interaction.options.getString('string');
				const morse = require('morse');
				interaction.followUp(morse.decode(mention));
			}
		}
	}else if (interaction.commandName === 'help') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('📬')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setURL('https://dsc.gg/qubit')
				.setLabel('Invite')
				.setStyle('LINK'),
			new MessageButton()
				.setURL('https://github.com/Mini-Ware/Qubit')
				.setLabel('Project')
				.setStyle('LINK'),
		);
		interaction.reply({ embeds: [{
		      color: '#221C35',
		      title: "Qubit",
		      description: "A simple yet powerful utility bot",
		      thumbnail: {
				    url: 'https://cdn.discordapp.com/avatars/826031374766440459/37a324d853cade9ee8fdd5b2b8e40ce7.webp?size=1024',
			    },
		      fields: [
				{
					name: '[*️⃣] Random',
					value: '`decide`, `dice`, `8ball`, `flip`, `quote`',
		      inline: false,
				},
		    {
					name: '[🔤] Fun',
					value: '`wyr`, `riddle`, `joke`, `roast`, `pickup`',
					inline: false,
				},
				{
					name: '[🎦] Media',
					value: '`spotify`, `youtube`, `wiki`, `emoji`, `icon`',
					inline: false,
				},
				{
					name: '[⏯️] Activity',
					value: '`ytt`, `chess`, `poker`, `betray`, `fishing`',
					inline: false,
				},
				{
					name: '[🔢] Tool',
					value: '`ping`, `mc`, `urban`, `encode`, `decode`',
					inline: false,
				}
		  	]
		    }], components: [row] });
	}/*else if (interaction.commandName === 'fishing') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🎣')
				.setStyle('PRIMARY'),
		);
		if(interaction.member.voice.channel) {
		    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'fishing').then(async invite => {
		      if(invite.code){
		        interaction.reply({ content: `Click on the link below to start watching YouTube Together\n${invite.code}`, components: [row] })
		      }else{
		        interaction.reply({ content: "Sorry, the YouTube Together activity has trouble starting", components: [row] })
		      }
		    });
		}else{
		  interaction.reply({ content: "Sorry, you are required to join a voice channel", components: [row] });
		}
	}else if (interaction.commandName === 'betray') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🕵️')
				.setStyle('PRIMARY'),
		);
		if(interaction.member.voice.channel) {
		    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'betrayal').then(async invite => {
		      if(invite.code){
		        interaction.reply({ content: `Click on the link below to start watching YouTube Together\n${invite.code}`, components: [row] })
		      }else{
		        interaction.reply({ content: "Sorry, the YouTube Together activity has trouble starting", components: [row] })
		      }
		    });
		}else{
		  interaction.reply({ content: "Sorry, you are required to join a voice channel", components: [row] });
		}
	}else if (interaction.commandName === 'poker') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🃏')
				.setStyle('PRIMARY'),
		);
		if(interaction.member.voice.channel) {
		    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
		      if(invite.code){
		        interaction.reply({ content: `Click on the link below to start watching YouTube Together\n${invite.code}`, components: [row] })
		      }else{
		        interaction.reply({ content: "Sorry, the YouTube Together activity has trouble starting", components: [row] })
		      }
		    });
		}else{
		  interaction.reply({ content: "Sorry, you are required to join a voice channel", components: [row] });
		}
	}else if (interaction.commandName === 'chess') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('♟️')
				.setStyle('PRIMARY'),
		);
		if(interaction.member.voice.channel) {
		    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
		      if(invite.code){
		        interaction.reply({ content: `Click on the link below to start watching YouTube Together\n${invite.code}`, components: [row] })
		      }else{
		        interaction.reply({ content: "Sorry, the YouTube Together activity has trouble starting", components: [row] })
		      }
		    });
		}else{
		  interaction.reply({ content: "Sorry, you are required to join a voice channel", components: [row] });
		}
	}else if (interaction.commandName === 'ytt') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🛋️')
				.setStyle('PRIMARY'),
		);
		if(interaction.member.voice.channel) {
		    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
		      if(invite.code){
		        interaction.reply({ content: `Click on the link below to start watching YouTube Together\n${invite.code}`, components: [row] })
		      }else{
		        interaction.reply({ content: "Sorry, the YouTube Together activity has trouble starting", components: [row] })
		      }
		    });
		}else{
		  interaction.reply({ content: "Sorry, you are required to join a voice channel", components: [row] });
		}
	}*/else if (interaction.commandName === 'invite') {
		interaction.reply({ content: 'https://dsc.gg/qubit' });
	}else if (interaction.commandName === 'project') {
		interaction.reply({ content: 'https://github.com/Mini-Ware/Qubit' });
	}else if (interaction.commandName === 'quote') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('☀️')
				.setStyle('PRIMARY'),
		);
		const quotemsg = all.getRandomQuote();
		interaction.reply({ content: quotemsg["quote"]+" -"+quotemsg["author"], components: [row] });
	}else if (interaction.commandName === 'riddle') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🧠')
				.setStyle('PRIMARY'),
		);
		const riddlemsg = all.getRandomRiddle();
		interaction.reply({ content: "Q: "+riddlemsg["riddle"]+"\nA: ||"+riddlemsg["answer"]+"||", components: [row] });
	}else if (interaction.commandName === 'joke') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🤡')
				.setStyle('PRIMARY'),
		);
		const jokenum = Math.floor(Math.random()*collection.joke.length);
		const jokemsg = collection.joke[jokenum];
		interaction.reply({ content: jokemsg, components: [row] });
	}else if (interaction.commandName === 'roast') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🔥')
				.setStyle('PRIMARY'),
		);
		const roastnum = Math.floor(Math.random()*collection.roast.length);
		const roastmsg = collection.roast[roastnum];
		interaction.reply({ content: roastmsg, components: [row] });
	}else if (interaction.commandName === 'pickup') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('💖')
				.setStyle('PRIMARY'),
		);
		const pickupnum = Math.floor(Math.random()*collection.pickup.length);
		const pickupmsg = collection.pickup[pickupnum];
		interaction.reply({ content: pickupmsg, components: [row] });
	}else if (interaction.commandName === 'ping') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🏓')
				.setStyle('PRIMARY'),
		);
		const ms = client.uptime;
		const day = Math.floor(ms / (24*60*60*1000));
		const dayms = ms % (24*60*60*1000);
		const hour = Math.floor(dayms / (60*60*1000));
		const hourms = ms % (60*60*1000);
		const min = Math.floor(hourms / (60*1000));
		interaction.reply({ content: "Websocket: "+client.ws.ping+"ms\nUptime: "+day+"d "+hour+"h "+min+"m", components: [row] });
	}else if (interaction.commandName === 'flip') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🪙')
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
				.setEmoji('🎲')
				.setStyle('PRIMARY'),
		);
		var range = interaction.options.getInteger('sides');
		var plot = Math.floor(Math.random()*range)+1;
		interaction.reply({ content: plot.toString(), components: [row] });
	}else if (interaction.commandName === '8ball') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🔮')
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
				.setEmoji('💡')
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
	}else if (interaction.commandName === 'mc') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('⛏️')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('domain'), components: [row] });
		const mention = interaction.options.getString('domain');
		    status(mention, 25565, (err, response) => {
		      if (err || response.online == false){
			interaction.channel.send("Sorry, data is currently not avaliable");
		      }else{

			//extract player names
			names = "";
			if (response.players.sample.length > 0){
			  names = "```";
			  x = 0;
			  while (x < response.players.sample.length){
			    names += "\n"+JSON.stringify(response.players.sample[x]["name"]);
			    x = x+1;
			  }
			  names = names+"```";
			}else{
			  names = "```None```"
			}
			var motd = response.motd;
			if (motd == ""){
				motd = response.motd_json;
			}
			interaction.channel.send({ embeds: [{
				color: '#221C35',
				title: "Multiplayer",
				description: "```"+motd+"```",
				fields: [
					{
					    inline:true,
					    name: 'Version',
					    value: response.server.name
					  },{
					    inline:true,
					    name: 'Players',
					    value: "Total: "+response.players.now+"/"+response.players.max
					  },{
					    name: 'Accounts',
					    value: names
					  }
			  	]
			}]});
		      }
		  })
	}else if (interaction.commandName === 'urban') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('📚')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('word'), components: [row] });
		const ud = require('urban-dictionary')
		ud.define(interaction.options.getString('word'), (error, results) => {
			const Filter = require('bad-words');
			const filter = new Filter();
			if (error || results[0].example == "" || (interaction.options.getString('word') != filter.clean(interaction.options.getString('word')) && interaction.channel.nsfw != true)) {
				interaction.followUp("Sorry, no matching definitions were found");
				return;
			}
			interaction.followUp({ embeds: [{
				color: '#221C35',
				title: "Dictionary",
				description: "```"+results[0].definition+"```",
				fields: [
					{
						name: 'Example',
						value: results[0].example
					}
			  	]
			}]});
		});
	}else if (interaction.commandName === 'eval') {
	    if (interaction.user.id == '597705976488919040'){
		var exec = interaction.options.getString('code');
		client.emojis.cache.forEach(emoji => {
		  if (exec.search(":"+emoji.name+":") != -1 && (exec.search("<") == -1 && exec.search(">") == -1)){
		    exec = exec.replace(new RegExp(":"+emoji.name+":", "g"), emoji.toString());
		  }
		});
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('📟')
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
					.setEmoji('⚠️')
					.setStyle('PRIMARY'),
			);
		      interaction.followUp({ content: "Sorry, an error has occurred", components: [row] });
		      return;
		    }
		  }
	    }else{
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🚫')
				.setStyle('PRIMARY'),
		);
	      interaction.reply({ content: "Access denied", components: [row] });
	    }
	}else if (interaction.commandName === 'python') {
		var exec = interaction.options.getString('code');
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🐍')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: '```py\n'+exec+'\n```', components: [row] });
		
		var body = {
		    "language": "py",
		    "version": "3.10.0",
		    "files": [
			{
			    "name": "main.py",
			    "content": exec
			}
		    ]
		}
		fetch('https://emkc.org/api/v2/piston/execute', {
			method: 'post',
			body: JSON.stringify(body),
			headers: {'Content-Type': 'application/json'}
		}).then( res => res.json()).then( result => {
			if (typeof(result["run"]) != "undefined"){
				if (result["run"]["stdout"] == ""){ result["run"]["stdout"] = "None" }
				if (result["run"]["stderr"] == ""){ result["run"]["stderr"] = "None" }
				interaction.channel.send({ embeds: [{
					color: '#221C35',
					title: "Result",
					description: "`Exited with code "+result["run"]["code"].toString()+"`",
					fields: [
						{
							name: 'Output',
							value: '```'+result["run"]["stdout"].replace(/`/g, "\`")+'```'
						},
						{
							name: 'Errors',
							value: '```'+result["run"]["stderr"].replace(/`/g, "\`")+'```'
						}
					]
				}]});
			}
		});
	
	}else if (interaction.commandName === 'bash') {
		var exec = interaction.options.getString('code');
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('#️⃣')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: '```bash\n'+exec+'\n```', components: [row] });
		
		var body = {
		    "language": "bash",
		    "version": "5.1.0",
		    "files": [
			{
			    "name": "main.sh",
			    "content": exec
			}
		    ]
		}
		fetch('https://emkc.org/api/v2/piston/execute', {
			method: 'post',
			body: JSON.stringify(body),
			headers: {'Content-Type': 'application/json'}
		}).then( res => res.json()).then( result => {
			if (typeof(result["run"]) != "undefined"){
				if (result["run"]["stdout"] == ""){ result["run"]["stdout"] = "None" }
				if (result["run"]["stderr"] == ""){ result["run"]["stderr"] = "None" }
				interaction.channel.send({ embeds: [{
					color: '#221C35',
					title: "Result",
					description: "`Exited with code "+result["run"]["code"].toString()+"`",
					fields: [
						{
							name: 'Output',
							value: '```'+result["run"]["stdout"].replace(/`/g, "\`")+'```'
						},
						{
							name: 'Errors',
							value: '```'+result["run"]["stderr"].replace(/`/g, "\`")+'```'
						}
					]
				}]});
			}
		});
	}
});
