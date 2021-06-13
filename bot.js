const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const all = require("everyday-fun");
const client = new Discord.Client();
client.login(process.env.APIKEY);
client.on('ready', init => {
	client.user.setActivity("q!help", {
  type: "STREAMING",
  url: "https://www.twitch.tv/mini_ware"
  });
});
client.on('message', details => {
	if (details.author.bot == true) {
		return;
	} else if (details.channel.type === 'dm') {
    details.channel.send("Sorry, this bot does not work in DM. You can only use this bot in a server.")
		return;
	}
  check(details);
});
  const command = details.content.substr(2);
if (command.startsWith('eval ') && details.author.id == '735753581298319370') {
        details.react("📟");
        const exec = details.content.substr(7);
        try {
            eval(exec);
        } catch (err) {}
  }else if (command=="invite"){
    details.channel.send("https://discord.com/oauth2/authorize?client_id=826031374766440459&permissions=8&scope=bot");
    details.react("📧");
  }else if (command=="8ball"){
    details.channel.send("Usage: `8ball [question]`\nE.g. `q!8ball will it rain tomorrow?`");
  }else if (command.startsWith("8ball")){
    var outcome = ["It is certain", 
                   "It is decidedly so", 
                   "Without a doubt", 
                   "Yes, definitely",
                   "As I see it, yes", 
                   "Most likely", 
                   "Yes",  
                   "My reply is no",
                   "My sources say no", 
                   "Very doubtful", 
                   "Reply hazy, try again", 
                   "Ask again later", 
                   "Better not tell you now",
                   "Cannot predict now", 
                   "Concentrate and ask again"];
    const ask = Math.floor(Math.random()*outcome.length);
    details.channel.send(outcome[ask]);
    details.react("🎱");
  }else if (command=="riddle"){
    const riddlemsg = all.getRandomRiddle();
    details.channel.send("Q: "+riddlemsg["riddle"]+"\nA: "+riddlemsg["answer"]);
    details.react("🧠");
  }else if (command=="joke"){
    const jokemsg = all.getRandomJoke();
    details.channel.send("Category: "+jokemsg["category"]+"\n"+jokemsg["body"]);
    details.react("🤡");
  }else if (command=="quote"){
    const quotemsg = all.getRandomQuote();
    details.channel.send(quotemsg["quote"]+" -"+quotemsg["author"]);
    details.react("☀️");
  }else if (command=="spotify"){
    details.channel.send("Usage: `spotify [playlist]`\nE.g. `q!spotify edm`");
  }else if (command.startsWith("spotify ")){
    details.react("🎧");
    details.channel.send("Fetching relevant playlists...").then(msg => {
    var mention = "site:open.spotify.com/playlist/ "+command.substr("8");
    var google = require('google');
    google.resultsPerPage = 20;
    var nextCounter = 0
    google(mention, (err, res) => {
      const parser = res.body.split('<a href="/url?q=');
      var parse = "";
      var list = [];
      var u = 1;
      var now = 0;
      var prev = "";
      while (u < (parser.length-1)){
          parse = parser[u].split('&');
          if (prev != parse[0]){
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
      msg.edit(result).then(msg => {
        msg.react("🔼");
        msg.react("🔽");
        const rtmp = '🔼';
        const ltmp = '🔽';
        const filter = (react, user) => {
					return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === details.author.id;
				};
        const stamp = msg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          if (react.emoji.name === ltmp && user.id === details.author.id) {
            if (now+1 < list.length){
              now = now+1;
              result=list[now];
              msg.edit("[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result);
            }
          }
          if (react.emoji.name === rtmp && user.id === details.author.id) {
            if (now+1 > 1){
              now = now-1;
              result=list[now];
              msg.edit("[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result);
            }
          }
        });
      });
    });
    });
  }else if (command=="youtube"){
    details.channel.send("Usage: `youtube [video]`\nE.g. `q!youtube mr beast`");
  }else if (command.startsWith("youtube ")){
    details.react("🎞️");
    details.channel.send("Fetching relevant videos...").then(msg => {
    var mention = "site:youtube.com/watch "+command.substr("8");
    var google = require('google');
    google.resultsPerPage = 20;
    var nextCounter = 0
    google(mention, (err, res) => {
      const parser = res.body.split('<a href="/url?q=');
      var parse = "";
      var list = [];
      var u = 1;
      var now = 0;
      var prev = "";
      while (u < (parser.length-1)){
          parse = parser[u].split('&');
          if (prev != parse[0]){
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
      msg.edit(result.replace("%3F", "?").replace("%3D", "=")).then(msg => {
        msg.react("🔼");
        msg.react("🔽");
        const rtmp = '🔼';
        const ltmp = '🔽';
        const filter = (react, user) => {
					return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === details.author.id;
				};
        const stamp = msg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          if (react.emoji.name === ltmp && user.id === details.author.id) {
            if (now+1 < list.length){
              now = now+1;
              result=list[now];
              msg.edit("[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
          if (react.emoji.name === rtmp && user.id === details.author.id) {
            if (now+1 > 1){
              now = now-1;
              result=list[now];
              msg.edit("[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
        });
      });
    });
    });
  }else if (command=="decide"){
    details.channel.send("Usage: `decide [options]`\nE.g. `q!decide go jogging, watch movie, play games`");
  }else if (command.startsWith("decide ")){
    var list = command.substr(7).split(",")
    var option = Math.floor(Math.random()*list.length)
    if (list[option].replace(/ /g, "") == ""){
      details.channel.send("Invalid");
    }else{
      details.channel.send(list[option]);
    }
    details.react("💡");
  }else if (command=="dice"){
    details.channel.send("Usage: `dice [sides]`\nE.g. `q!dice 6`");
  }else if (command.startsWith("dice ")){
    var max = command.substr(5)
    var range = Number(max)
    var plot = Math.floor(Math.random()*range)+1
    details.channel.send(plot.toString());
    details.react("🎲");
  }else if (command=="invert"){
    details.channel.send("Usage: `invert [text]`\nE.g. `q!invert example`");
  }else if (command.startsWith("invert ")){
    var string = command.substr(7);
    const unicode = string.split("").reverse().join("")
    details.channel.send(unicode.replace(/n/g, "u").replace(/d/g, "p").replace(/p/g, "d").replace(/q/g, "b").replace(/B/g, "q").replace(/D/g, "p").replace(/Q/g, "b").replace(/A/g, "∀").replace(/C/g, "Ɔ").replace(/E/g, "Ǝ").replace(/F/g, "Ⅎ").replace(/G/g, "ƃ").replace(/H/g, "H").replace(/I/g, "I").replace(/J/g, "ſ").replace(/K/g, "ʞ").replace(/L/g, "˥").replace(/M/g, "M").replace(/N/g, "N").replace(/O/g, "O").replace(/P/g, "Ԁ").replace(/R/g, "ɹ").replace(/S/g, "S").replace(/T/g, "┴").replace(/U/g, "∩").replace(/V/g, "Λ").replace(/W/g, "M").replace(/X/g, "X").replace(/Y/g, "⅄").replace(/Z/g, "Z").replace(/a/g, "ɐ").replace(/c/g, "ɔ").replace(/e/g, "ǝ").replace(/f/g, "ɟ").replace(/g/g, "ƃ").replace(/h/g, "ɥ").replace(/i/g, "ᴉ").replace(/j/g, "ɾ").replace(/k/g, "ʞ").replace(/l/g, "l").replace(/m/g, "ɯ").replace(/o/g, "o").replace(/q/g, "b").replace(/r/g, "ɹ").replace(/s/g, "s").replace(/t/g, "ʇ").replace(/u/g, "n").replace(/v/g, "ʌ").replace(/w/g, "ʍ").replace(/x/g, "x").replace(/y/g, "ʎ").replace(/z/g, "z").replace(/b/g, "q"));
    details.react("🪞");
  }else if (command=="cursive"){
    details.channel.send("Usage: `cursive [text]`\nE.g. `q!cursive example`");
  }else if (command.startsWith("cursive ")){
    var string = command.substr(7);
    const unicode = string.replace(/A/g, "𝓐").replace(/B/g, "𝓑").replace(/C/g, "𝓒").replace(/D/g, "𝓓").replace(/E/g, "𝓔").replace(/F/g, "𝓕").replace(/G/g, "𝓖").replace(/H/g, "𝓗").replace(/I/g, "𝓘").replace(/J/g, "𝓙").replace(/K/g, "𝓚").replace(/L/g, "𝓛").replace(/M/g, "𝓜").replace(/N/g, "𝓝").replace(/O/g, "𝓞").replace(/P/g, "𝓟").replace(/Q/g, "𝓠").replace(/R/g, "𝓡").replace(/S/g, "𝓢").replace(/T/g, "𝓣").replace(/U/g, "𝓤").replace(/V/g, "𝓥").replace(/W/g, "𝓦").replace(/X/g, "𝓧").replace(/Y/g, "𝓨").replace(/Z/g, "𝓩").replace(/a/g, "𝓪").replace(/b/g, "𝓫").replace(/c/g, "𝓬").replace(/d/g, "𝓭").replace(/e/g, "𝓮").replace(/f/g, "𝓯").replace(/g/g, "𝓰").replace(/h/g, "𝓱").replace(/i/g, "𝓲").replace(/j/g, "𝓳").replace(/k/g, "𝓴").replace(/l/g, "𝓵").replace(/m/g, "𝓶").replace(/o/g, "𝓸").replace(/p/g, "𝓹").replace(/q/g, "𝓺").replace(/r/g, "𝓻").replace(/s/g, "𝓼").replace(/t/g, "𝓽").replace(/u/g, "𝓾").replace(/v/g, "𝓿").replace(/w/g, "𝔀").replace(/x/g, "𝔁").replace(/y/g, "𝔂").replace(/z/g, "𝔃")
    details.channel.send(unicode.replace(/n/g, "𝓷"));
    details.react("\🖋");
  }else if (command=="fraktur"){
    details.channel.send("Usage: `fraktur [text]`\nE.g. `q!fraktur example`");
  }else if (command.startsWith("fraktur ")){
    var string = command.substr(7);
    const unicode = string.replace(/A/g, "𝔄").replace(/B/g, "𝔅").replace(/C/g, "ℭ").replace(/D/g, "𝔇").replace(/E/g, "𝔈").replace(/F/g, "𝔉").replace(/G/g, "𝔊").replace(/H/g, "ℌ").replace(/I/g, "ℑ").replace(/J/g, "𝔍").replace(/K/g, "𝔎").replace(/L/g, "𝔏").replace(/M/g, "𝔐").replace(/N/g, "𝔑").replace(/O/g, "𝔒").replace(/P/g, "𝔓").replace(/Q/g, "𝔔").replace(/R/g, "ℜ").replace(/S/g, "𝔖").replace(/T/g, "𝔗").replace(/U/g, "𝔘").replace(/V/g, "𝔙").replace(/W/g, "𝔚").replace(/X/g, "𝔛").replace(/Y/g, "𝔜").replace(/Z/g, "ℨ").replace(/a/g, "𝔞").replace(/b/g, "𝔟").replace(/c/g, "𝔠").replace(/d/g, "𝔡").replace(/e/g, "𝔢").replace(/f/g, "𝔣").replace(/g/g, "𝔤").replace(/h/g, "𝔥").replace(/i/g, "𝔦").replace(/j/g, "𝔧").replace(/k/g, "𝔨").replace(/l/g, "𝔩").replace(/m/g, "𝔪").replace(/o/g, "𝔬").replace(/p/g, "𝔭").replace(/q/g, "𝔮").replace(/r/g, "𝔯").replace(/s/g, "𝔰").replace(/t/g, "𝔱").replace(/u/g, "𝔲").replace(/v/g, "𝔳").replace(/w/g, "𝔴").replace(/x/g, "𝔵").replace(/y/g, "𝔶").replace(/z/g, "𝔷")
    details.channel.send(unicode.replace(/n/g, "𝔫"));
    details.react("🪶");
  }else if (command=="help"){
    details.channel.send({ embed: {
      color: '#221C35',
      title: "Qubit",
      description: "A simple discord utility bot",
      //https://discord.com/oauth2/authorize?client_id=826031374766440459&permissions=8&scope=bot
      fields: [
		{
			name: 'Random',
			value: '`decide`, `dice`, `8ball`',
		},
		{
			name: 'Style',
			value: '`cursive`, `fraktur`, `invert`',
			inline: false,
		},
		{
			name: 'Fun',
			value: '`riddle`, `joke`, `quote`',
			inline: false,
		},
		{
			name: 'Media',
			value: '`spotify`, `youtube`',
			inline: false,
		},
  	],
      image: {
        url: "https://media.tenor.com/images/f1fd8cd005c0139679b161c7e022212d/tenor.gif"
      }
    ,footer: {
      text:"To add this bot, use q!invite"
    }
    }});
  }
}
