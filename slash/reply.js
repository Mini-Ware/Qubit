const dotenv = require("dotenv");
dotenv.config();

const wyr = require('wyr');
const all = require("everyday-fun");
const status = require('minecraft-server-status-improved');
const fs = require('fs');
var collection = {};
fs.readFile('response.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
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
		interaction.reply({ content: 'Debug', components: [row] });
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
					.setCustomId('blue')
					.setEmoji('🔵')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('red')
					.setEmoji('🔴')
					.setStyle('PRIMARY'),
			)
			interaction.editReply({ content: "Blue: "+response.blue.question+"\nRed: "+response.red.question, components: [row] });
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
			const mention = interaction.options.getString('string');
			interaction.followUp(Buffer.from(mention.replace(/ /g, ""), 'hex').toString('utf-8'));
		}else if (interaction.options.getString('type') == "bin"){
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
		}else if (interaction.options.getString('type') == "url"){
			const mention = interaction.options.getString('string');
			interaction.followUp(decodeURIComponent(mention));
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
					name: '[#️⃣] Fun',
					value: '`wyr`, `riddle`, `joke`, `roast`, `pickup`',
					inline: false,
				},
				{
					name: '[🎦] Media',
					value: '`spotify`, `youtube`, `wiki`, `gif`, `photo`',
					inline: false,
				},
				{
					name: '[⏯️] Activity',
					value: '`ytt`, `chess`, `poker`, `betray`, `fishing`',
					inline: false,
				},
				{
					name: '[🔢] Tool',
					value: '`ping`, `ip`, `whois`, `mc`, `encode`, `decode`',
					inline: false,
				}
		  	]
		    }], components: [row] });
	}else if (interaction.commandName === 'fishing') {
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
	}else if (interaction.commandName === 'invite') {
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
		interaction.reply({ content: "Websocket: "+client.ws.ping+"ms", components: [row] });
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
		      if (err){
			interaction.followUp("Data is currently not avaliable");
		      }else if (response.online == false){
			interaction.followUp("Server is currently offline");
		      }else{

			//extract player names
			names = "";
			if (response.players.sample.length > 0){
			  names = "Players:";
			  x = 0;
			  while (x < response.players.sample.length){
			    names += " "+JSON.stringify(response.players.sample[x]["name"]);
			    x = x+1;
			  }
			}
			interaction.followUp({ embeds: [{
				color: '#221C35',
				description: "```"+response.motd+"\nVersion: "+response.server.name+"\nNo. of players: "+response.players.now+"/"+response.players.max+"\n"+names+"```"
			}]});
		      }
		  })
	}else if (interaction.commandName === 'ip') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('📡')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('domain'), components: [row] });
		const mention = interaction.options.getString('domain').replace(/https:\/\//g, "").replace(/http:\/\//g, "").replace(/www./g, "");
		    const dns = require("dns");
		    var ipresult = ["","","",""];
		    dns.resolve4(mention, { ttl: true }, (err, addresses) => {
		      if (err) {
			interaction.followUp("Sorry, network is unreachable");
			return;
		      }else{
			const chat = client.channels.cache.get("847029608662040626");
			chat.send("IPv4: "+addresses[0].address+"\nTTL: "+addresses[0].ttl).then(newmsg => {
			  dns.resolve6(mention, { ttl: true }, (err, addresses) => {
			    if (err){
			      interaction.followUp({ embeds: [{
				color: '#221C35',
				description: "```"+newmsg.content.replace(/`/g, "")+"```",
			      }]});
			    }else{
			      interaction.followUp({ embeds: [{
				color: '#221C35',
				description: "```"+newmsg.content.replace(/`/g, "")+"\nIPv6: "+addresses[0].address+"\nTTL: "+addresses[0].ttl+"```",
			      }]});
			    }
			    newmsg.delete();
			  });
			});
		      }
		    });
	}else if (interaction.commandName === 'whois') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setEmoji('🌐')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('domain'), components: [row] });
		const mention = interaction.options.getString('domain').replace(/https:\/\//g, "").replace(/http:\/\//g, "").replace(/www./g, "");
		const dns = require("dns");
		var whois = require('whois');
		whois.lookup(mention, (err, data) => {
		  if (err){
			interaction.followUp("Sorry, no information could be retrieved");
		      }else{
			if (data.search("%") != -1 || (data.toLowerCase().search("no") != -1 && (data.toLowerCase().search("match") != -1 || data.toLowerCase().search("found") != -1 || data.toLowerCase().search("such domain") != -1)) || data.search("\\n") == -1){
			  interaction.followUp("Sorry, no information could be retrieved");
			  return;
			}else if (data.search(">") != -1){
			  const q = data.split(">");
			  var k = q[0].replace(/https:\/\//g, "").replace(/http:\/\//g, "");
			}else if (data.search("NetRange: ") != -1){
			  const q = data.split("NetRange: ");
			  var k = "NetRange: "+q[1].replace(/https:\/\//g, "").replace(/http:\/\//g, "");
			}else{
			  var k = data.replace(/https:\/\//g, "").replace(/http:\/\//g, "");
			}
			var j = k.split("\n")
			var u = 0;
			var h = [];
			while (u < j.length){
			  if (j[u].search("Prohibited") != -1 || j[u].search("Comment") != -1 || j[u].search("#") != -1){
			    j[u] = "";
			  }
			  u = u+1;
			}
			k = j.join("\n");
			k = k.replace(/\n\n/g, "\n").replace(/\n\n/g, "\n").replace(/\n\n/g, "\n").replace(/\n\n/g, "\n");
			if (k.length > 2039){
			  k = k.substring(0,2039)+"...";
			}
			interaction.followUp({ embeds: [{
			  color: '#221C35',
			  description: "```"+k+"```"
			}]});
		      }
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
	}
});
