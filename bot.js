const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const all = require("everyday-fun");
const { MongoClient } = require('mongodb');
const uri = process.env.DB;
const mongo = new MongoClient(uri);
mongo.connect();
async function createListing(mongo, newListing){
    const result = await mongo.db("player").collection("score").insertOne(newListing);
}
async function findOneListingByName(mongo, nameOfListing) {
    const result = await mongo.db("player").collection("score").findOne({ _id: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        createListing(mongo, { _id:nameOfListing, credit:0 })
    }
}
async function updateListingByName(mongo, nameOfListing, updatedListing) {
    const result = await mongo.db("player").collection("score").updateOne({ _id: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}
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
function check(details){
  const command = details.content.substr(2);
  if (command.toLowerCase() == 'eval') {
    details.channel.send('Usage: `eval [code]`\nE.g. `q!eval console.log("debug")`');
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
  }else if (command.startsWith("stat")){
    findOneListingByName(mongo, details.author.id);
    mongo.db("player").collection("score").findOne({ _id: details.author.id }).then(result => {
    details.channel.send("ID: "+details.author.id+"\nEnergy: "+(result.credit).toString()+"\\⚡");
    });
    details.react("📊");
  }else if (command.toLowerCase()=="rps"){
    details.channel.send("Usage: `rps [rock/paper/scissors]`\nE.g. `q!rps rock`");
  }else if (command.toLowerCase().startsWith("rps")){
    findOneListingByName(mongo, details.author.id);
    const option = command.substr(4).toLowerCase();
    const choice = ["Rock","Paper","Scissors"];
    const compgen = Math.floor(Math.random()*choice.length);
    const compopt = choice[compgen].toLowerCase();
    if (option == "rock" || option == "paper" || option == "scissors"){
      if(compopt == option){
        details.channel.send("Computer: "+choice[compgen]+"\nIts a draw! (+0\\⚡)");
      }else{
        if ((option == "rock" && compopt == "paper") || (option == "paper" && compopt == "scissors") || (option == "scissors" && compopt == "rock")){
          details.channel.send("Computer: "+choice[compgen]+"\nYou lost! (-3\\⚡)");
          mongo.db("player").collection("score").findOne({ _id: details.author.id }).then(result => {
            updateListingByName(mongo, details.author.id, { _id: details.author.id, credit: result.credit-3})
          })
        }else{
          details.channel.send("Computer: "+choice[compgen]+"\nYou won! (+5\\⚡)");
          mongo.db("player").collection("score").findOne({ _id: details.author.id }).then(result => {
            updateListingByName(mongo, details.author.id, { _id: details.author.id, credit: result.credit+5})
          })
        }
      }
    }else{
      details.channel.send("Invalid");
    }
    details.react("🪨");
  }else if (command.toLowerCase()=="coinflip"){
    details.channel.send("Usage: `coinflip [head/tails]`\nE.g. `q!coinflip head`");
  }else if (command.toLowerCase().startsWith("coinflip")){
    findOneListingByName(mongo, details.author.id);
    const option = command.substr(9).toLowerCase();
    const choice = ["Head","Tails"];
    const compgen = Math.floor(Math.random()*choice.length);
    const compopt = choice[compgen].toLowerCase();
    if (option == "tails" || option == "head"){
      if(compopt == option){
        details.channel.send("Computer: "+choice[compgen]+"\nYou won! (+5\\⚡)");
        mongo.db("player").collection("score").findOne({ _id: details.author.id }).then(result => {
            updateListingByName(mongo, details.author.id, { _id: details.author.id, credit: result.credit+5})
        })
      }else{
        details.channel.send("Computer: "+choice[compgen]+"\nYou lost! (-3\\⚡)");
        mongo.db("player").collection("score").findOne({ _id: details.author.id }).then(result => {
            updateListingByName(mongo, details.author.id, { _id: details.author.id, credit: result.credit-3})
        })
      }
    }else{
      details.channel.send("Invalid");
    }
    details.react("🪙");
  }else if (command.toLowerCase()=="8ball"){
    details.channel.send("Usage: `8ball [question]`\nE.g. `q!8ball will it rain tomorrow?`");
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
  }else if (command.toLowerCase().startsWith("topic")){
    const topicnum = Math.floor(Math.random()*collection.topic.length)
    const topicmsg = collection.topic[topicnum]
    details.channel.send(topicmsg);
    details.react("💭");
  }else if (command.toLowerCase().startsWith("quote")){
    const quotemsg = all.getRandomQuote();
    details.channel.send(quotemsg["quote"]+" -"+quotemsg["author"]);
    details.react("☀️");
  }else if (command.toLowerCase()=="spotify"){
    details.channel.send("Usage: `spotify [playlist]`\nE.g. `q!spotify edm`");
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
    details.channel.send("Usage: `youtube [video]`\nE.g. `q!youtube nasa`");
  }else if (command.toLowerCase().startsWith("youtube ")){
    details.react("🎞️");
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
    details.channel.send("Usage: `giphy [gif]`\nE.g. `q!giphy space`");
  }else if (command.toLowerCase().startsWith("giphy ")){
    details.react("📸");
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
          if (prev != parse[0] && parse[0].search("google")==-1 && parse[0].search("edit")==-1 && parse[0].search("l0Iych4GHWMRxci2I")==-1){
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
  }else if (command.toLowerCase()=="decide"){
    details.channel.send("Usage: `decide [options]`\nE.g. `q!decide go jogging, watch movie, play games`");
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
    details.channel.send("Usage: `dice [sides]`\nE.g. `q!dice 6`");
  }else if (command.toLowerCase().startsWith("dice ")){
    var max = command.substr(5)
    var range = Number(max)
    var plot = Math.floor(Math.random()*range)+1
    details.channel.send(plot.toString());
    details.react("🎲");
  }else if (command.toLowerCase()=="help"){
    details.channel.send({ embed: {
      color: '#221C35',
      title: "Qubit",
      description: "A simple discord utility bot",
      //https://discord.com/oauth2/authorize?client_id=826031374766440459&permissions=8&scope=bot
      fields: [
		{
			name: '*️⃣ Random',
			value: '`decide`, `dice`, `8ball`, `topic`',
		},
    {
			name: '#️⃣ Fun',
			value: '`riddle`, `joke`, `quote`',
			inline: false,
		},
		{
			name: '📶 Economy',
			value: '`rps`, `coinflip`, `stat`',
			inline: false,
		},
		{
			name: '🎦 Media',
			value: '`spotify`, `youtube`, `giphy`\n\n[Invite Link](https://discord.com/oauth2/authorize?client_id=826031374766440459&scope=bot&permissions=19520)',
			inline: false,
		},
  	],
      image: {
        url: "https://media.tenor.com/images/f1fd8cd005c0139679b161c7e022212d/tenor.gif"
      },
      footer: {
        text: "To contribute, use q!project"
      }
    }});
    details.react("📧");
  }
}
