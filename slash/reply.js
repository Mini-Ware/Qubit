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
        try{
		if (!interaction.isCommand() || interaction.channel.type !== 'GUILD_TEXT'){
			return;
		}
	}catch(err){
		return;
	}
	if (interaction.commandName === 'debug') {
		const row = new MessageActionRow().addComponents(
			new MessageButton().setDisabled(true)
				.setCustomId('primary')
				.setLabel('🧭')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: 'Debug', components: [row] });
	}else if (interaction.commandName === 'fishing') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🎣')
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
				.setLabel('🕵️')
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
				.setLabel('🃏')
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
				.setLabel('♟️')
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
				.setLabel('🛋️')
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
	}else if (interaction.commandName === 'ip') {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('📡')
				.setStyle('PRIMARY'),
		);
		interaction.reply({ content: interaction.options.getString('domain'), components: [row] });
		const mention = interaction.options.getString('domain').substr(3).replace(/https:\/\//g, "").replace(/http:\/\//g, "").replace(/www./g, "");
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
				description: newmsg.content.replace(/`/g, ""),
			      }]});
			    }else{
			      interaction.followUp({ embeds: [{
				color: '#221C35',
				description: newmsg.content.replace(/`/g, "")+"\nIPv6: "+addresses[0].address+"\nTTL: "+addresses[0].ttl,
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
				.setLabel('🌐')
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
			if (k.length > 2045){
			  k = k.substring(0,2045)+"...";
			}
			interaction.followUp({ embeds: [{
			  color: '#221C35',
			  description: k
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
	    }else{
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('primary')
				.setLabel('🚫')
				.setStyle('PRIMARY'),
		);
	      interaction.reply({ content: "Access denied", components: [row] });
	    }
	}
});
