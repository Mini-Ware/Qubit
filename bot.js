const dotenv = require('dotenv');
dotenv.config();
const topgg = require("dblapi.js");
const Discord = require('discord.js');
require('discord-reply');
const all = require("everyday-fun");
var os = require('os');
const fs = require('fs');
var collection = {};
fs.readFile('response.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  eval("collection = "+data);
})
const client = new Discord.Client();
client.login(process.env.APIKEY);
const dbl = new topgg(process.env.DBL, client);
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
	}else if (details.content.toLowerCase().startsWith("q!")){
    check(details);
  }
});
var fetch = require('node-fetch');
fetch('https://discord.bots.gg/api/v1/bots/826031374766440459/stats', 
        {
            method: "POST",
            headers: {
                Authorization: process.env.DBOT,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guildCount: client.guilds.size
            })
        }).then((res) => {
            console.log(res);
})
function check(details){
  const command = details.content.substr(2);
  if (command.toLowerCase() == 'eval') {
    details.lineReplyNoMention('Usage: `eval [code]`\nE.g. `q!eval console.log("debug")`');
  }else if (command.toLowerCase().startsWith('eval ')) {
    if (details.author.id == '735753581298319370' || details.author.id == '597705976488919040'){
        details.react("📟");
        const exec = details.content.substr(7).replace(/APIKEY/g, "TOKEN");
        try {
            eval(exec);
        } catch (err) {}
    }else{
      details.channel.send("Access denied");
      details.react("🚫");
    }
  }else if (command.toLowerCase()=="project"){
    details.channel.send("https://github.com/Mini-Ware/Qubit");
    details.react("🤝");
  }else if (command.toLowerCase().startsWith("encode b64")){
    const mention = command.substr(11);
    var b64 = Buffer.from(mention, 'utf-8').toString('base64');
    if (b64.length > 2048){
        b64 = b64.substring(0,2039)+"..."
    }
    details.channel.send(b64);
    details.react("🔒");
  }else if (command.toLowerCase().startsWith("encode bin")){
    const mention = command.substr(11);
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
    if (fullstr.length > 2048){
        fullstr = fullstr.substring(0,2039)+"..."
    }
    details.channel.send(fullstr);
    details.react("🔒");
  }else if (command.toLowerCase().startsWith("encode hex")){
    const mention = command.substr(11);
    var bhex = Buffer.from(mention, 'utf-8').toString('hex');
    if (bhex.length > 2048){
        bhex = bhex.substring(0,2039)+"..."
    }
    details.channel.send(bhex.toUpperCase());
    details.react("🔒");
  }else if (command.toLowerCase().startsWith("encode")){
    details.lineReplyNoMention("Usage: `encode [b64/bin/hex] [string]`\nE.g. `q!encode b64 sample`");
  }else if (command.toLowerCase().startsWith("decode b64")){
    const mention = command.substr(11);
    details.channel.send(Buffer.from(mention, 'base64').toString('utf-8'));
    details.react("🔑");
  }else if (command.toLowerCase().startsWith("decode bin")){
    const mention = command.substr(11);
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
    details.channel.send(fullstr);
    details.react("🔑");
  }else if (command.toLowerCase().startsWith("decode hex")){
    const mention = command.substr(11);
    details.channel.send(Buffer.from(mention, 'hex').toString('utf-8'));
    details.react("🔑");
  }else if (command.toLowerCase().startsWith("decode")){
    details.lineReplyNoMention("Usage: `decode [b64/bin/hex] [string]`\nE.g. `q!decode b64 c2FtcGxl`");
  }else if (command.toLowerCase()=="ip"){
    details.lineReplyNoMention("Usage: `ip [domain]`\nE.g. `q!ip google.com`");
  }else if (command.toLowerCase().startsWith("ip")){
    const mention = command.substr(3);
    const dns = require("dns");
    var ipresult = ["","","",""];
    dns.resolve4(mention, { ttl: true }, (err, addresses) => {
      if (err) {
        details.channel.send("Sorry, network is unreachable");
        return;
      }else{
        details.channel.send("IPv4: "+addresses[0].address+"\nTTL: "+addresses[0].ttl).then(msg => {
          dns.resolve6(mention, { ttl: true }, (err, addresses) => {
            if (err){
              details.channel.send({ embed: {
                color: '#221C35',
                description: msg.content.replace(/`/g, ""),
              }});
            }else{
              details.channel.send({ embed: {
                color: '#221C35',
                description: msg.content.replace(/`/g, "")+"\nIPv6: "+addresses[0].address+"\nTTL: "+addresses[0].ttl,
              }});
            }
            msg.delete();
          });
        });
      }
    });
    details.react("📡");
  }else if (command.toLowerCase()=="whois"){
    details.lineReplyNoMention("Usage: `whois [domain/ip]`\nE.g. `q!whois google.com`");
  }else if (command.toLowerCase().startsWith("whois")){
    const mention = command.substr(6);
    const dns = require("dns");
    var whois = require('whois');
    whois.lookup(mention, (err, data) => {
      if (err){
        details.channel.send("Sorry, no information could be retrieved");
      }else{
        if (data.search("%") != -1 || data.search("No match") != -1 || data.toLowerCase().search("not found") != -1){
          details.channel.send("Sorry, no information could be retrieved");
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
        details.channel.send({ embed: {
          color: '#221C35',
          description: k
        }});
      }
    });
    details.react("🌐");
  }else if (command.toLowerCase()=="invert"){
    details.lineReplyNoMention("Usage: `invert [text]`\nE.g. `q!invert example`");
  }else if (command.toLowerCase().startsWith("invert ")){
    var string = command.substr(7);
    const unicode = string.replace(/n/g, "u").replace(/d/g, "p").replace(/p/g, "d").replace(/q/g, "b").replace(/B/g, "q").replace(/D/g, "p").replace(/Q/g, "b").replace(/A/g, "∀").replace(/C/g, "Ɔ").replace(/E/g, "Ǝ").replace(/F/g, "Ⅎ").replace(/G/g, "ƃ").replace(/H/g, "H").replace(/I/g, "I").replace(/J/g, "ſ").replace(/K/g, "ʞ").replace(/L/g, "˥").replace(/M/g, "M").replace(/N/g, "N").replace(/O/g, "O").replace(/P/g, "Ԁ").replace(/R/g, "ɹ").replace(/S/g, "S").replace(/T/g, "┴").replace(/U/g, "∩").replace(/V/g, "Λ").replace(/W/g, "M").replace(/X/g, "X").replace(/Y/g, "⅄").replace(/Z/g, "Z").replace(/a/g, "ɐ").replace(/c/g, "ɔ").replace(/e/g, "ǝ").replace(/f/g, "ɟ").replace(/g/g, "ƃ").replace(/h/g, "ɥ").replace(/i/g, "ᴉ").replace(/j/g, "ɾ").replace(/k/g, "ʞ").replace(/l/g, "l").replace(/m/g, "ɯ").replace(/o/g, "o").replace(/q/g, "b").replace(/r/g, "ɹ").replace(/s/g, "s").replace(/t/g, "ʇ").replace(/u/g, "n").replace(/v/g, "ʌ").replace(/w/g, "ʍ").replace(/x/g, "x").replace(/y/g, "ʎ").replace(/z/g, "z").replace(/b/g, "q")
    details.channel.send(unicode);
    details.react("🪞");
  }else if (command.toLowerCase()=="cursive"){
    details.lineReplyNoMention("Usage: `cursive [text]`\nE.g. `q!cursive example`");
  }else if (command.toLowerCase().startsWith("cursive ")){
    var string = command.substr(7);
    const unicode = string.replace(/A/g, "𝓐").replace(/B/g, "𝓑").replace(/C/g, "𝓒").replace(/D/g, "𝓓").replace(/E/g, "𝓔").replace(/F/g, "𝓕").replace(/G/g, "𝓖").replace(/H/g, "𝓗").replace(/I/g, "𝓘").replace(/J/g, "𝓙").replace(/K/g, "𝓚").replace(/L/g, "𝓛").replace(/M/g, "𝓜").replace(/N/g, "𝓝").replace(/O/g, "𝓞").replace(/P/g, "𝓟").replace(/Q/g, "𝓠").replace(/R/g, "𝓡").replace(/S/g, "𝓢").replace(/T/g, "𝓣").replace(/U/g, "𝓤").replace(/V/g, "𝓥").replace(/W/g, "𝓦").replace(/X/g, "𝓧").replace(/Y/g, "𝓨").replace(/Z/g, "𝓩").replace(/a/g, "𝓪").replace(/b/g, "𝓫").replace(/c/g, "𝓬").replace(/d/g, "𝓭").replace(/e/g, "𝓮").replace(/f/g, "𝓯").replace(/g/g, "𝓰").replace(/h/g, "𝓱").replace(/i/g, "𝓲").replace(/j/g, "𝓳").replace(/k/g, "𝓴").replace(/l/g, "𝓵").replace(/m/g, "𝓶").replace(/o/g, "𝓸").replace(/p/g, "𝓹").replace(/q/g, "𝓺").replace(/r/g, "𝓻").replace(/s/g, "𝓼").replace(/t/g, "𝓽").replace(/u/g, "𝓾").replace(/v/g, "𝓿").replace(/w/g, "𝔀").replace(/x/g, "𝔁").replace(/y/g, "𝔂").replace(/z/g, "𝔃")
    details.channel.send(unicode.replace(/n/g, "𝓷"));
    details.react("\🖋");
  }else if (command.toLowerCase()=="fraktur"){
    details.lineReplyNoMention("Usage: `fraktur [text]`\nE.g. `q!fraktur example`");
  }else if (command.toLowerCase().startsWith("fraktur ")){
    var string = command.substr(7);
    const unicode = string.replace(/A/g, "𝔄").replace(/B/g, "𝔅").replace(/C/g, "ℭ").replace(/D/g, "𝔇").replace(/E/g, "𝔈").replace(/F/g, "𝔉").replace(/G/g, "𝔊").replace(/H/g, "ℌ").replace(/I/g, "ℑ").replace(/J/g, "𝔍").replace(/K/g, "𝔎").replace(/L/g, "𝔏").replace(/M/g, "𝔐").replace(/N/g, "𝔑").replace(/O/g, "𝔒").replace(/P/g, "𝔓").replace(/Q/g, "𝔔").replace(/R/g, "ℜ").replace(/S/g, "𝔖").replace(/T/g, "𝔗").replace(/U/g, "𝔘").replace(/V/g, "𝔙").replace(/W/g, "𝔚").replace(/X/g, "𝔛").replace(/Y/g, "𝔜").replace(/Z/g, "ℨ").replace(/a/g, "𝔞").replace(/b/g, "𝔟").replace(/c/g, "𝔠").replace(/d/g, "𝔡").replace(/e/g, "𝔢").replace(/f/g, "𝔣").replace(/g/g, "𝔤").replace(/h/g, "𝔥").replace(/i/g, "𝔦").replace(/j/g, "𝔧").replace(/k/g, "𝔨").replace(/l/g, "𝔩").replace(/m/g, "𝔪").replace(/o/g, "𝔬").replace(/p/g, "𝔭").replace(/q/g, "𝔮").replace(/r/g, "𝔯").replace(/s/g, "𝔰").replace(/t/g, "𝔱").replace(/u/g, "𝔲").replace(/v/g, "𝔳").replace(/w/g, "𝔴").replace(/x/g, "𝔵").replace(/y/g, "𝔶").replace(/z/g, "𝔷")
    details.channel.send(unicode.replace(/n/g, "𝔫"));
    details.react("🪶");
  }else if (command.toLowerCase()=="altcap"){
    details.lineReplyNoMention("Usage: `altcap [text]`\nE.g. `q!altcap example`");
  }else if (command.toLowerCase().startsWith("altcap ")){
    var string = command.substr(7);
    let letters = string.split("");
    let n = 0;
    while (n < letters.length){
      if (Math.floor(Math.random()*2) == 1){
        letters[n] = letters[n].toUpperCase();
      }
      n = n+1;
    }
    const unicode = letters.join("");
    details.channel.send(unicode);
    details.react("🏔️");
  }else if (command.toLowerCase()=="8ball"){
    details.lineReplyNoMention("Usage: `8ball [question]`\nE.g. `q!8ball will it rain tomorrow?`");
  }else if (command.toLowerCase().startsWith("8ball")){
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
    details.react("🔮");
  }else if (command.toLowerCase().startsWith("riddle")){
    const riddlemsg = all.getRandomRiddle();
    details.channel.send("Q: "+riddlemsg["riddle"]+"\nA: "+riddlemsg["answer"]);
    details.react("🧠");
  }else if (command.toLowerCase().startsWith("joke")){
    const jokenum = Math.floor(Math.random()*collection.joke.length)
    const jokemsg = collection.joke[jokenum]
    details.channel.send(jokemsg);
    details.react("🤡");
  }else if (command.toLowerCase().startsWith("pickup")){
    const pickupnum = Math.floor(Math.random()*collection.pickup.length)
    const pickupmsg = collection.pickup[pickupnum]
    details.channel.send(pickupmsg);
    details.react("💖");
  }else if (command.toLowerCase().startsWith("topic")){
    const topicnum = Math.floor(Math.random()*collection.topic.length)
    const topicmsg = collection.topic[topicnum]
    details.channel.send(topicmsg);
    details.react("💭");
  }else if (command.toLowerCase().startsWith("roast")){
    const roastnum = Math.floor(Math.random()*collection.roast.length)
    const roastmsg = collection.roast[roastnum]
    details.channel.send(roastmsg);
    details.react("🔥");
  }else if (command.toLowerCase().startsWith("quote")){
    const quotemsg = all.getRandomQuote();
    details.channel.send(quotemsg["quote"]+" -"+quotemsg["author"]);
    details.react("☀️");
  }else if (command.toLowerCase()=="spotify"){
    details.lineReplyNoMention("Usage: `spotify [playlist]`\nE.g. `q!spotify edm`");
  }else if (command.toLowerCase().startsWith("spotify ")){
    details.react("🎧");
    details.channel.send("Fetching relevant playlists...").then(msg => {
    var mention = "site:open.spotify.com/playlist/ "+command.substr("8").replace(":", " ");
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
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1){
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
  }else if (command.toLowerCase()=="youtube"){
    details.lineReplyNoMention("Usage: `youtube [video]`\nE.g. `q!youtube rover landing`");
  }else if (command.toLowerCase().startsWith("youtube ")){
    details.react("📺");
    details.channel.send("Fetching relevant videos...").then(msg => {
    var mention = "site:youtube.com/watch "+command.substr("8").replace(":", " ");
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
          if (prev != parse[0] && parse[0].search("google")==-1){
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
  }else if (command.toLowerCase()=="giphy"){
    details.lineReplyNoMention("Usage: `giphy [gif]`\nE.g. `q!giphy space`");
  }else if (command.toLowerCase().startsWith("giphy ")){
    details.react("🎞️");
    details.channel.send("Looking for a GIF...").then(msg => {
    var mention = "site:giphy.com/gifs "+command.substr("6").replace(":", " ");
    var google = require('google');
    google.resultsPerPage = 30;
    var nextCounter = 0
    google(mention, (err, res) => {
      const parser = res.body.split('<a href="/url?q=');
      var parse = "";
      var list = [];
      var u = 1;
      var prev = "";
      var title = [];
      while (u < (parser.length-1)){
          parse = parser[u].split('&');
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("edit")==-1){
            if (parse[0].search("-")!=-1){
              const locate = parse[0].split("-").reverse();
              var tag = parse[0].split("/").reverse()
              var name = tag[0].split("-");
              name.pop();
              var caplimit = 0;
              while (caplimit <= (name.length-1)){
                if (name[caplimit] != ""){
                  name[caplimit] = name[caplimit][0].toUpperCase() + name[caplimit].slice(1)
                }
                caplimit = caplimit+1;
              }
              title.push(name.join(" "));
              list.push("https://media.giphy.com/media/"+locate[0]+"/giphy.gif");
            }else{
              const locate = parse[0].split("/").reverse();
              title.push("Unknown");
              list.push("https://media.giphy.com/media/"+locate[0]+"/giphy.gif");
            }
          }
          prev = parse[0]
          u = u+1;
      }
      if (list.length == 0){
          result = "Sorry, no GIFs could be found";
          msg.edit(result);
          return;
      }else{
        const randomgif = Math.floor(Math.random()*list.length);
        result=list[randomgif];
        header=title[randomgif]
      }
      msg.delete();
      msg.channel.send({ embed: {
        title: header,
        color: '#221C35',
        image: {
          url: result.replace("%3F", "?").replace("%3D", "=")
        }
      }});
    });
    });
  }else if (command.toLowerCase()=="pexels"){
    details.lineReplyNoMention("Usage: `pexels [image]`\nE.g. `q!pexels milky way`");
  }else if (command.toLowerCase().startsWith("pexels ")){
    details.react("📸");
    details.channel.send("Looking for an image...").then(msg => {
    var mention = "site:pexels.com/photo "+command.substr("7").replace(":", " ");
    var google = require('google');
    google.resultsPerPage = 30;
    var nextCounter = 0
    google(mention, (err, res) => {
      const parser = res.body.split('<a href="/url?q=');
      var parse = "";
      var list = [];
      var u = 1;
      var prev = "";
      var title = [];
      while (u < (parser.length-1)){
          parse = parser[u].split('&');
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1){
            if (parse[0].search("-")!=-1){
              const locate = parse[0].split("-").reverse();
              locate[0] = locate[0].replace("/", "")
              var tag = parse[0].split("/").reverse()
              var name = tag[1].split("-");
              name.pop();
              var caplimit = 0;
              while (caplimit <= (name.length-1)){
                if (name[caplimit] != ""){
                  name[caplimit] = name[caplimit][0].toUpperCase() + name[caplimit].slice(1)
                }
                caplimit = caplimit+1;
              }
              title.push(name.join(" "));
              list.push("https://images.pexels.com/photos/"+locate[0]+"/pexels-photo-"+locate[0]+".jpeg");
            }else{
              const locate = parse[0].split("/").reverse();
              title.push("Unknown");
              list.push("https://images.pexels.com/photos/"+locate[0]+"/pexels-photo-"+locate[0]+".jpeg");
            }
          }
          prev = parse[0]
          u = u+1;
      }
      if (list.length == 0){
          result = "Sorry, no images could be found";
          msg.edit(result);
          return;
      }else{
        const randomimage = Math.floor(Math.random()*list.length);
        result=list[randomimage];
        header=title[randomimage]
      }
      msg.delete();
      msg.channel.send({ embed: {
        title: header,
        color: '#221C35',
        image: {
          url: result.replace("%3F", "?").replace("%3D", "=")
        }
      }});
    });
    });
  }else if (command.toLowerCase()=="decide"){
    details.lineReplyNoMention("Usage: `decide [options]`\nE.g. `q!decide go jogging, watch movie, play games`");
  }else if (command.toLowerCase().startsWith("decide ")){
    var list = command.substr(7).split(",")
    var option = Math.floor(Math.random()*list.length);
    details.react("💡");
    var checkloop = 0;
    try{
    while (checkloop <= list.length){
      if (list[checkloop].replace(/ /g, "") == ""){
        details.channel.send("Invalid");
        return;
      }
      checkloop = checkloop+1;
    }
    }catch(err){}
    details.channel.send(list[option]);
  }else if (command.toLowerCase()=="dice"){
    details.lineReplyNoMention("Usage: `dice [sides]`\nE.g. `q!dice 6`");
  }else if (command.toLowerCase().startsWith("dice ")){
    var max = command.substr(5)
    var range = Number(max)
    var plot = Math.floor(Math.random()*range)+1
    details.channel.send(plot.toString());
    details.react("🎲");
  }else if (command.toLowerCase().startsWith("flip")){
    var land = Math.floor(Math.random()*2)
    if (land == 1){
      details.channel.send("Head");
    }else{
      details.channel.send("Tails");
    }
    details.react("🪙");
  }else if (command.toLowerCase()=="help"){
    details.channel.send({ embed: {
      color: '#221C35',
      title: "Qubit",
      description: "A simple discord utility bot",
      thumbnail: {
		    url: 'https://cdn.discordapp.com/avatars/826031374766440459/37a324d853cade9ee8fdd5b2b8e40ce7.webp?size=1024',
	    },
      //https://discord.com/oauth2/authorize?client_id=826031374766440459&permissions=8&scope=bot
      fields: [
		{
			name: '[*️⃣] Random',
			value: '`decide`, `dice`, `8ball`, `flip`, `quote`',
      inline: true,
		},
    {
			name: '[#️⃣] Fun',
			value: '`riddle`, `joke`, `roast`, `topic`, `pickup`',
			inline: false,
		},
		{
			name: '[🔣] Style',
			value: '`cursive`, `fraktur`, `invert`, `altcap`',
			inline: false,
		},
		{
			name: '[🎦] Media',
			value: '`spotify`, `youtube`, `pexels`, `giphy`',
			inline: true,
		},
		{
			name: '[📶] Network',
			value: '`ip`, `whois`, `encode`, `decode`, `eval`',
			inline: false,
		},
		{
			name: 'Important Links',
			value: '[Add Qubit into your server](https://discord.com/oauth2/authorize?client_id=826031374766440459&scope=bot&permissions=19520)\n[Join Coder\'s System server](https://discord.gg/3chuca3EMh)',
			inline: false,
		}
  	],
      footer: {
        text: "To contribute, use q!project"
      }
    }});
    details.react("📧");
  }
}
