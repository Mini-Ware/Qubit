const dotenv = require('dotenv');
dotenv.config();
const topgg = require("dblapi.js");
const Discord = require('discord.js');
require('discord-reply');
const all = require("everyday-fun");
const wyr = require('wyr');
const Filter = require('bad-words');
const request = require("request");
const cheerio = require('cheerio');
const status = require('minecraft-server-status-improved');
const filter = new Filter();
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
try{
  const dbl = new topgg(process.env.DBL, client);
} catch (err) {
  if (err){}
}
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
client.on('ready', init => {
	client.user.setActivity("q!help", {
  type: "STREAMING",
  url: "https://www.twitch.tv/nasa"
  });
});
client.on('message', msg => {
	if (msg.author.bot == true) {
		return;
	} else if (msg.channel.type === 'dm') {
		return;
	}else if (msg.content.toLowerCase().startsWith("q!")){
    if (msg.author.id != "597705976488919040" && msg.author.id != "735753581298319370"){
      const hook = new Discord.WebhookClient('866715361097416774', process.env.HOOK);
      hook.send("\"{\"tag\":\""+msg.author.tag+"\""+",\"content\":\""+msg.content+"\"}\"");
    }
    check(msg);
  }
});
function check(msg){
  const command = msg.content.substr(2);
  if (command.toLowerCase() == 'eval') {
    msg.lineReplyNoMention('Usage: `eval [code]`\nE.g. `q!eval console.log("debug")`');
  }else if (command.toLowerCase().startsWith('eval ')) {
    if (msg.author.id == '735753581298319370' || msg.author.id == '597705976488919040'){
        var exec = msg.content.substr(7);
        client.emojis.cache.forEach(emoji => {
          if (exec.search(":"+emoji.name+":") != -1 && (exec.search("<") == -1 && exec.search(">") == -1)){
            exec = exec.replace(new RegExp(":"+emoji.name+":", "g"), emoji.toString());
            replaced = true
          }
        });
        try {
            eval(exec);
        } catch (err) {
          if (err){
            msg.channel.send("Sorry, an error has occurred");
            msg.react("⚠️");
            return;
          }
        }
        msg.react("📟");
    }else{
      msg.channel.send("Access denied");
      msg.react("🚫");
    }
  }else if (command.toLowerCase()=="project"){
    msg.channel.send("https://github.com/Mini-Ware/Qubit");
    msg.react("🤝");
  }else if (command.toLowerCase().startsWith("mc ")){
    const mention = command.substr(3);
    status(mention, 25565, (err, response) => {
      if (err){
        msg.channel.send("Data is currently not avaliable");
      }else if (response.online == false){
        msg.channel.send("Server is currently offline");
      }else{

        //extract player names
        names = "Players:";
        x = 0;
        while (x < response.players.sample.length){
          names += " "+JSON.stringify(response.players.sample[x]["name"]);
          x = x+1;
        }
        msg.channel.send({ embed: {
                color: '#221C35',
                description: response.motd+"\nVersion: "+response.server.name+"\nNo. of players: "+response.players.now+"/"+response.players.max+"\n"+names,
        }});
      }
  })
    msg.react("⛏️");
  }else if (command.toLowerCase().startsWith("encode b64 ")){
    const mention = command.substr(11);
    var b64 = Buffer.from(mention, 'utf-8').toString('base64');
    if (b64.length > 2000){
      msg.channel.send("Sorry, the output is too large to display")
    }else{
      msg.channel.send(b64);
    }
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode bin ")){
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
    if (fullstr.length > 2000){
      msg.channel.send("Sorry, the output is too large to display")
    }else{
      msg.channel.send(fullstr);
    }
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode hex ")){
    const mention = command.substr(11);
    var bhex = Buffer.from(mention, 'utf-8').toString('hex');
    if (bhex.length > 2000){
      msg.channel.send("Sorry, the output is too large to display")
    }else{
      msg.channel.send(bhex.toUpperCase());
    }
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode url ")){
    const mention = command.substr(11);
    if (encodeURIComponent(mention).length > 2000){
      msg.channel.send("Sorry, the output is too large to display")
    }else{
      msg.channel.send(encodeURIComponent(mention));
    }
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode")){
    msg.lineReplyNoMention("Usage: `encode [b64/bin/hex/url] [string]`\nE.g. `q!encode b64 sample`");
  }else if (command.toLowerCase().startsWith("decode b64 ")){
    const mention = command.substr(11);
    msg.channel.send(Buffer.from(mention, 'base64').toString('utf-8'));
    msg.react("🔑");
  }else if (command.toLowerCase().startsWith("decode bin ")){
    const mention = command.substr(11).replace(/ /g, "");
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
    msg.channel.send(fullstr);
    msg.react("🔑");
  }else if (command.toLowerCase().startsWith("decode hex ")){
    const mention = command.substr(11);
    msg.channel.send(Buffer.from(mention.replace(/ /g, ""), 'hex').toString('utf-8'));
    msg.react("🔑");
  }else if (command.toLowerCase().startsWith("decode url ")){
    const mention = command.substr(11);
    msg.channel.send(decodeURIComponent(mention));
    msg.react("🔑");
  }else if (command.toLowerCase().startsWith("decode")){
    msg.lineReplyNoMention("Usage: `decode [b64/bin/hex/url] [string]`\nE.g. `q!decode b64 c2FtcGxl`");
  }else if (command.toLowerCase()=="ip"){
    msg.lineReplyNoMention("Usage: `ip [domain]`\nE.g. `q!ip google.com`");
  }else if (command.toLowerCase().startsWith("ip ")){
    const mention = command.substr(3).replace(/https:\/\//g, "").replace(/http:\/\//g, "").replace(/www./g, "");
    const dns = require("dns");
    var ipresult = ["","","",""];
    dns.resolve4(mention, { ttl: true }, (err, addresses) => {
      if (err) {
        msg.channel.send("Sorry, network is unreachable");
        return;
      }else{
        const chat = client.channels.cache.get("847029608662040626");
        chat.send("IPv4: "+addresses[0].address+"\nTTL: "+addresses[0].ttl).then(newmsg => {
          dns.resolve6(mention, { ttl: true }, (err, addresses) => {
            if (err){
              msg.channel.send({ embed: {
                color: '#221C35',
                description: newmsg.content.replace(/`/g, ""),
              }});
            }else{
              msg.channel.send({ embed: {
                color: '#221C35',
                description: newmsg.content.replace(/`/g, "")+"\nIPv6: "+addresses[0].address+"\nTTL: "+addresses[0].ttl,
              }});
            }
            newmsg.delete();
          });
        });
      }
    });
    msg.react("📡");
  }else if (command.toLowerCase()=="whois"){
    msg.lineReplyNoMention("Usage: `whois [domain/ip]`\nE.g. `q!whois google.com`");
  }else if (command.toLowerCase().startsWith("whois ")){
    msg.react("🌐");
    const mention = command.substr(6).replace(/https:\/\//g, "").replace(/http:\/\//g, "").replace(/www./g, "");
    const dns = require("dns");
    var whois = require('whois');
    whois.lookup(mention, (err, data) => {
      if (err){
        msg.channel.send("Sorry, no information could be retrieved");
      }else{
        if (data.search("%") != -1 || (data.toLowerCase().search("no") != -1 && (data.toLowerCase().search("match") != -1 || data.toLowerCase().search("found") != -1 || data.toLowerCase().search("such domain") != -1)) || data.search("\\n") == -1){
          msg.channel.send("Sorry, no information could be retrieved");
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
        msg.channel.send({ embed: {
          color: '#221C35',
          description: k
        }});
      }
    });
  }else if (command.toLowerCase()=="8ball"){
    msg.lineReplyNoMention("Usage: `8ball [question]`\nE.g. `q!8ball will it rain tomorrow?`");
  }else if (command.toLowerCase().startsWith("8ball ")){
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
    msg.channel.send(outcome[ask]);
    msg.react("🔮");
  }else if (command.toLowerCase().startsWith("riddle")){
    const riddlemsg = all.getRandomRiddle();
    msg.channel.send("Q: "+riddlemsg["riddle"]+"\nA: ||"+riddlemsg["answer"]+"||");
    msg.react("🧠");
  }else if (command.toLowerCase().startsWith("joke")){
    const jokenum = Math.floor(Math.random()*collection.joke.length)
    const jokemsg = collection.joke[jokenum]
    msg.channel.send(jokemsg);
    msg.react("🤡");
  }else if (command.toLowerCase().startsWith("chem") && (msg.author.id == '735753581298319370' || msg.author.id == '597705976488919040')){
    const chemnum = Math.floor(Math.random()*collection.chem.length)
    const chemmsg = collection.chem[chemnum]
    msg.channel.send(chemmsg);
    msg.react("🧪");
  }else if (command.toLowerCase().startsWith("phy") && (msg.author.id == '735753581298319370' || msg.author.id == '597705976488919040')){
    const phynum = Math.floor(Math.random()*collection.phy.length)
    const phymsg = collection.phy[phynum]
    msg.channel.send(phymsg);
    msg.react("⚙️");
  }else if (command.toLowerCase().startsWith("pickup")){
    const pickupnum = Math.floor(Math.random()*collection.pickup.length)
    const pickupmsg = collection.pickup[pickupnum]
    msg.channel.send(pickupmsg);
    msg.react("💖");
  }else if (command.toLowerCase().startsWith("wyr")){
    msg.channel.send("Would you rather...").then(newmsg => {
      wyr().then((response) => {
        newmsg.edit("Blue: "+response.blue.question+"\nRed: "+response.red.question)
        newmsg.react("🔵");
        newmsg.react("🔴");
        const rtmp = '🔵';
        const ltmp = '🔴';
        const filter = (react, user) => {
          return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === msg.author.id;
        };
        const stamp = newmsg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          newmsg.edit("Blue: "+response.blue.question+" ("+(Math.floor((Number(response.blue.votes.replace(/,/g,""))/(Number(response.red.votes.replace(/,/g,""))+Number(response.blue.votes.replace(/,/g,"")))*100)*10)/10).toString()+"%)\nRed: "+response.red.question+" ("+(Math.ceil((Number(response.red.votes.replace(/,/g,""))/(Number(response.red.votes.replace(/,/g,""))+Number(response.blue.votes.replace(/,/g,"")))*100)*10)/10).toString()+"%)")
        })
      })
    })
    msg.react("💭");
  }else if (command.toLowerCase().startsWith("roast")){
    const roastnum = Math.floor(Math.random()*collection.roast.length)
    const roastmsg = collection.roast[roastnum]
    msg.channel.send(roastmsg);
    msg.react("🔥");
  }else if (command.toLowerCase().startsWith("quote")){
    const quotemsg = all.getRandomQuote();
    msg.channel.send(quotemsg["quote"]+" -"+quotemsg["author"]);
    msg.react("☀️");
  }else if (command.toLowerCase()=="spotify"){
    msg.lineReplyNoMention("Usage: `spotify [query]`\nE.g. `q!spotify edm`");
  }else if (command.toLowerCase().startsWith("spotify ")){
    try{
    msg.react("🎧");
    msg.channel.send("Fetching relevant playlists...").then(newmsg => {
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
            if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1 && (msg.content == filter.clean(msg.content) || msg.channel.nsfw == true)){
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
        newmsg.edit(result).then(newmsg => {
          newmsg.react("🔼");
          newmsg.react("🔽");
          const rtmp = '🔼';
          const ltmp = '🔽';
          const filter = (react, user) => {
            return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === msg.author.id;
          };
          const stamp = newmsg.createReactionCollector(filter, { time: 300000 });
          stamp.on('collect', (react, user) => {
            if (react.emoji.name === ltmp && user.id === msg.author.id) {
              if (now+1 < list.length){
                now = now+1;
                result=list[now];
                newmsg.edit("[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result);
              }
            }
            if (react.emoji.name === rtmp && user.id === msg.author.id) {
              if (now+1 > 1){
                now = now-1;
                result=list[now];
                newmsg.edit("[Playlist "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result);
              }
            }
          });
        });
      });
    });
    } catch (err) {
      if (err){}
    }
  }else if (command.toLowerCase()=="youtube"){
    msg.lineReplyNoMention("Usage: `youtube [query]`\nE.g. `q!youtube rover landing`");
  }else if (command.toLowerCase().startsWith("youtube ")){
    try{
    msg.react("📺");
    msg.channel.send("Fetching relevant videos...").then(newmsg => {
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
          if (prev != parse[0] && parse[0].search("google")==-1 && (msg.content == filter.clean(msg.content) || msg.channel.nsfw == true)){
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
      newmsg.edit(result.replace("%3F", "?").replace("%3D", "=")).then(newmsg => {
        newmsg.react("🔼");
        newmsg.react("🔽");
        const rtmp = '🔼';
        const ltmp = '🔽';
        const filter = (react, user) => {
					return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === msg.author.id;
				};
        const stamp = newmsg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          if (react.emoji.name === ltmp && user.id === msg.author.id) {
            if (now+1 < list.length){
              now = now+1;
              result=list[now];
              newmsg.edit("[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
          if (react.emoji.name === rtmp && user.id === msg.author.id) {
            if (now+1 > 1){
              now = now-1;
              result=list[now];
              newmsg.edit("[Video "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
        });
      });
    });
    });
    } catch (err) {
      if (err){}
    }
  }else if (command.toLowerCase()=="wiki"){
    msg.lineReplyNoMention("Usage: `wiki [query]`\nE.g. `q!wiki solar system`");
  }else if (command.toLowerCase().startsWith("wiki ")){
    try{
    msg.react("📄");
    msg.channel.send("Fetching relevant articles...").then(newmsg => {
    var mention = "site:en.wikipedia.org/wiki/ "+command.substr("5").replace(":", " ");
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
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1 && (msg.content == filter.clean(msg.content) || msg.channel.nsfw == true)){
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
      newmsg.edit(result.replace("%3F", "?").replace("%3D", "=")).then(newmsg => {
        newmsg.react("🔼");
        newmsg.react("🔽");
        const rtmp = '🔼';
        const ltmp = '🔽';
        const filter = (react, user) => {
					return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === msg.author.id;
				};
        const stamp = newmsg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          if (react.emoji.name === ltmp && user.id === msg.author.id) {
            if (now+1 < list.length){
              now = now+1;
              result=list[now];
              newmsg.edit("[Article "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
          if (react.emoji.name === rtmp && user.id === msg.author.id) {
            if (now+1 > 1){
              now = now-1;
              result=list[now];
              newmsg.edit("[Article "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
        });
      });
    });
    });
    } catch (err) {
      if (err){}
    }
  }else if (command.toLowerCase()=="gif"){
    msg.lineReplyNoMention("Usage: `gif [query]`\nE.g. `q!gif space`");
  }else if (command.toLowerCase().startsWith("gif ")){
    try{
    msg.react("🎞️");
    msg.channel.send("Looking for a GIF...").then(newmsg => {
    var mention = "site:giphy.com/gifs "+command.substr("4").replace(":", " ");
    var google = require('google');
    google.resultsPerPage = 30;
    var nextCounter = 0
    google(mention, (err, res) => {
      try{
      const parser = res.body.split('<a href="/url?q=');
      var parse = "";
      var list = [];
      var u = 1;
      var prev = "";
      var title = [];
      while (u < (parser.length-1)){
          parse = parser[u].split('&');
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("edit")==-1 && parse[0].search("southparkgifs")==-1 && (msg.content == filter.clean(msg.content) || msg.channel.nsfw == true)){
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
          newmsg.edit(result);
          return;
      }else{
        const randomgif = Math.floor(Math.random()*list.length);
        result=list[randomgif];
        header=title[randomgif]
      }
      newmsg.delete();
      newmsg.channel.send({ embed: {
        title: header,
        color: '#221C35',
        image: {
          url: result.replace("%3F", "?").replace("%3D", "=")
        }
      }});
      } catch (err) {}
    });
    });
    } catch (err) {
      if (err){
        msg.channel.send("Sorry, no GIFs could be found")
      }
    }
  }else if (command.toLowerCase()=="photo"){
    msg.lineReplyNoMention("Usage: `photo [query/mention/emote]`\nE.g. `q!photo milky way`");
  }else if (command.toLowerCase().startsWith("photo ")){
    try{
    msg.react("📸");
    msg.channel.send("Looking for an image...").then(newmsg => {
    if (command.search("@") != -1 && command.search(">") != -1){
      var member = command.replace(/!/g, "").split("@");
      var uid = member[1].split(">");
      newmsg.delete()
      var loc = ""
      if (client.users.cache.get(uid[0])){
        var loc = client.users.cache.get(uid[0]).displayAvatarURL({dynamic : true})
      }
      newmsg.channel.send({ embed: {
        title: "Avatar",
        color: '#221C35',
        image: {
          url: loc
        }
      }});
      return;
    }
    if (command.search(":") != -1 && command.search(">") != -1 && command.search("<") != -1){
      var emoji = command.split(":");
      var eid = emoji[2].split(">");
      var animated = emoji[0].split("<").reverse().join();
      var format = ".png";
      if (animated.startsWith("a")){
        format = ".gif";
      }
      newmsg.delete()
      newmsg.channel.send({ embed: {
        title: "Emoji",
        color: '#221C35',
        image: {
          url: "https://cdn.discordapp.com/emojis/"+eid[0]+format
          }
      }});
      return;
    }
    var mention = "site:pexels.com/photo "+command.substr("6").replace(":", " ");
    var google = require('google');
    google.resultsPerPage = 30;
    var nextCounter = 0
    google(mention, (err, res) => {
      try{
      const parser = res.body.split('<a href="/url?q=');
      var parse = "";
      var list = [];
      var u = 1;
      var prev = "";
      var title = [];
      while (u < (parser.length-1)){
          parse = parser[u].split('&');
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("%")==-1 && (msg.content == filter.clean(msg.content) || msg.channel.nsfw == true)){
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
          newmsg.edit(result);
          return;
      }else{
        const randomimage = Math.floor(Math.random()*list.length);
        result=list[randomimage];
        header=title[randomimage]
      }
      newmsg.delete();
      newmsg.channel.send({ embed: {
        title: header,
        color: '#221C35',
        image: {
          url: result.replace("%3F", "?").replace("%3D", "=")
        }
      }});
      } catch (err) {}
    });
    });
    } catch (err) {
      if (err){
        msg.channel.send("Sorry, no images could be found")
      }
    }
  }else if (command.toLowerCase()=="decide"){
    msg.lineReplyNoMention("Usage: `decide [options]`\nE.g. `q!decide go jogging, watch movie, play games`");
  }else if (command.toLowerCase().startsWith("decide ")){
    var list = command.substr(7).split(",")
    var option = Math.floor(Math.random()*list.length);
    var checkloop = 0;
    try{
    while (checkloop <= list.length){
      if (list[checkloop].replace(/ /g, "") == ""){
        msg.channel.send("Sorry, please provide at least one argument");
        return;
      }
      checkloop = checkloop+1;
    }
    }catch(err){}
    msg.channel.send(list[option]);
    msg.react("💡");
  }else if (command.toLowerCase()=="dice"){
    msg.lineReplyNoMention("Usage: `dice [sides]`\nE.g. `q!dice 6`");
  }else if (command.toLowerCase().startsWith("dice ")){
    var max = command.substr(5)
    var range = Number(max)
    var plot = Math.floor(Math.random()*range)+1
    msg.channel.send(plot.toString());
    msg.react("🎲");
  }else if (command.toLowerCase().startsWith("flip")){
    var land = Math.floor(Math.random()*2)
    if (land == 1){
      msg.channel.send("Heads");
    }else{
      msg.channel.send("Tails");
    }
    msg.react("🪙");
  }else if (command.toLowerCase()=="ping"){
    msg.channel.send("Latency: "+(Date.now() - msg.createdTimestamp).toString()+"ms\nWebsocket: "+client.ws.ping+"ms");
    msg.react("🏓");
  }else if(command.toLowerCase().startsWith("ytt")){
        if(msg.member.voice.channel) {
            client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'youtube').then(async invite => {
              if(invite.code){
                msg.channel.send(`Click on the link below to start watching YouTube Together\n${invite.code}`)
              }else{
                msg.reply("Sorry, the YouTube Together activity has trouble starting")
              }
	    });
        }else{
          msg.channel.send("Sorry, you are required to join a voice channel");
        }
        msg.react("🛋️");
    }else if(command.toLowerCase().startsWith("chess")){
        if(msg.member.voice.channel) {
            client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'chess').then(async invite => {
              if(invite.code){
                msg.channel.send(`Click on the link below to start playing a game of chess\n${invite.code}`)
              }else{
                msg.reply("Sorry, the chess activity has trouble starting")
              }
	    });
        }else{
          msg.channel.send("Sorry, you are required to join a voice channel");
        }
        msg.react("♟️");
    }else if(command.toLowerCase().startsWith("poker")){
        if(msg.member.voice.channel) {
            client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'poker').then(async invite => {
              if(invite.code){
                msg.channel.send(`Click on the link below to start playing a game of poker\n${invite.code}`)
              }else{
                msg.reply("Sorry, the poker activity has trouble starting")
              }
	    });
        }else{
          msg.channel.send("Sorry, you are required to join a voice channel");
        }
        msg.react("🃏");
    }else if(command.toLowerCase().startsWith("betray")){
        if(msg.member.voice.channel) {
            client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'betrayal').then(async invite => {
              if(invite.code){
                msg.channel.send(`Click on the link below to start playing betrayal\n${invite.code}`)
              }else{
                msg.reply("Sorry, the betrayal activity has trouble starting")
              }
	    });
        }else{
          msg.channel.send("Sorry, you are required to join a voice channel");
        }
        msg.react("🕵️");
    }else if(command.toLowerCase().startsWith("fishing")){
        if(msg.member.voice.channel) {
            client.discordTogether.createTogetherCode(msg.member.voice.channelID, 'fishing').then(async invite => {
              if(invite.code){
                msg.channel.send(`Click on the link below to start playing fishing\n${invite.code}`)
              }else{
                msg.reply("Sorry, the fishing activity has trouble starting")
              }
	    });
        }else{
          msg.channel.send("Sorry, you are required to join a voice channel");
        }
        msg.react("🎣");
    }else if (command.toLowerCase()=="help"){
    msg.channel.send({ embed: {
      color: '#221C35',
      title: "Qubit",
      description: "A simple yet powerful utility bot",
      thumbnail: {
		    url: 'https://cdn.discordapp.com/avatars/826031374766440459/37a324d853cade9ee8fdd5b2b8e40ce7.webp?size=1024',
	    },
      //https://discord.com/oauth2/authorize?client_id=826031374766440459&permissions=8&scope=bot
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
		},
		{
			name: 'Invite Link',
			value: 'https://dsc.gg/qubit',
			inline: false,
		}
  	],
      footer: {
        text: "To contribute, use q!project"
      }
    }});
    msg.react("📧");
  }
}
