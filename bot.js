const dotenv = require('dotenv');
dotenv.config();
const topgg = require("dblapi.js");
const Discord = require('discord.js');
require('discord-reply');
const all = require("everyday-fun");
const wyr = require('wyr');
const Filter = require('bad-words');
const filter = new Filter();
var os = require('os');
const fs = require('fs');
var collection = {
    "joke": [
      "I ate a clock yesterday, it was very time-consuming.",
      "A perfectionist walked into a bar...apparently, the bar wasn't set high enough.",
      "Did you hear about the crook who stole a calendar? He got twelve months.",
      "Did you hear about the semi-colon that broke the law? He was given two consecutive sentences.",
      "Never criticize someone until you've walked a mile in their shoes. That way, when you criticize them, they won't be able to hear you from that far away. Plus, you'll have their shoes.",
      "I own the world's worst thesaurus. Not only is it awful, it's awful.",
      "Velcro—what a rip-off!",
      "Don't you hate it when someone answers their own questions? I do.",
      "If we shouldn't eat at night, why do they put a light in the fridge?",
      "I can't believe I got fired from the calendar factory: all I did was take a day off!",
      "I went to see the doctor about my short-term memory problems — the first thing he did was make me pay in advance.",
      "You have two parts of the brain, “left” and “right” — in the left side, there's nothing right and in the right side, there's nothing left.",
      "Why do bees hum? They don't remember the lyrics!",
      "I have a dog to provide me with unconditional love but I also have a cat to remind me that I don't deserve it: it's all about balance.",
      "Don't spell part backwards. It's a trap.",
      "Today a man knocked on my door and asked for a small donation towards the local swimming pool. I gave him a glass of water.",
      "Most people are shocked when they find out how bad I am as an electrician.",
      "Moses had the first tablet that could connect to the cloud.",
      "Don't trust atoms, they make up everything.",
      "Thanks for explaining the word “many” to me, it means a lot.",
      "I hope when I inevitably choke to death on gummy bears people just say I was killed by bears and leave it at that.",
      "I'm reading a book about anti-gravity. It's impossible to put down.",
      "R.I.P boiled water. You will be mist.",
      "A Tesla doesn't have that new car smell, they have more of an Elon Musk",
      "Told my daughter to wear glasses during math. It improves division",
      "Little known fact...There are currently more airplanes under the water, than there are submarines in the air.",
      "I once had a psychic girlfriend, she left me before we met.",
      "'DO NOT TOUCH' must be one of the most terrifying things to read in braille.",
      "Gravity is one of the most fundamental forces in the universe, but if you remove it, you get gravy",
      "The thief who stole my iPhone could face time.",
      "Justice is a dish best served cold, if it were served warm, it would be just water.",
      "Apparently I snore so loudly that it scares everyone in the car I'm driving.",
      "I used to be a member of the secret cooking society but they kicked me out for spilling the beans.",
      "I saw a dwarf climbing down a prison wall and thought that it was a little condescending",
      "People often say 'icy' is the easiest word to spell and, looking at it now, I see why.",
      "What happened when 50 cent got hungry? 58.",
      "What do computer science teachers write on in class? The motherboard!",
      "For Halloween we dressed up as almonds. Everyone could tell we were nuts.",
      "The lesson of Halloween is that pretending to be something you're not will lead to a sweet reward.",
      "I want to be something really scary for Halloween this year so I'm dressing up as a phone battery at 2%.",
      "I have won first place in this Halloween costume contest 16 years in a row. This year I am dressed as a hot dog. I'm on a roll.",
      "Boo!",
      "My roommate says our house is haunted. I've been living here for 300 years and I haven't noticed anything.",
      "Pardon me for drooling, but without my jaw, I can't help myself."
    ],
    "topic": [
      "What was the last funny video you saw?",
      "What do you do to get rid of stress?",
      "What is something you are obsessed with?",
      "What three words best describe you?",
      "What would be your perfect weekend?",
      "What's your favorite number? Why?",
      "What are you going to do this weekend?",
      "What's the most useful thing you own?",
      "What's your favorite way to waste time?",
      "What do you think of tattoos? Do you have any?",
      "What was your worst travel experience?",
      "How important do you think self-improvement is?",
      "What is a good life?",
      "What was the most important chance encounter you've had?",
      "What was the scariest dream you've had?",
      "What is a bad life?",
      "What valuable lessons should we learn from history?",
      "How do your values differ from others?",
      "What social situations do you dread?",
      "What is your routine for an average weekday?",
      "What happened in the funniest YouTube video you've seen?",
      "What's the story behind how you met your best friend?",
      "What would your perfect house look like?",
      "What's the worst work mistake you've made?",
      "What would your utopia look like?",
      "What did your school waste money on that nobody liked?",
      "What was the best birthday wish or gift you've ever received?",
      "What makes you laugh out loud?",
      "Where and when was the most amazing sunset you have ever seen?",
      "What's the best thing that happened to you last week?",
      "If you could go back in time, what year would you travel to?",
      "What have you been so fascinated about since you were younger?",
      "What's the most daring thing you've ever done?",
      "What is a truth you don't like accepting about yourself?",
      "What is a psychological trick you often use?",
      "What is something that really annoys you but doesn't bother most people?",
      "What rules were created just because of you?",
      "What age do you wish you could permanently be?",
      "What three things do you think of the most each day?",
      "What is the best gift you have been given?",
      "What's a word you love the sound or meaning of?",
      "What's your favourite moment in this server?",
      "If you could only eat one meal for the rest of your life, what would it be?",
      "What makes someone trustworthy?",
      "What is the saddest scene you've seen in a TV show/movie?",
      "What show that you watched that has the saddest ending?",
      "If you won 1 million dollars, and you have to spend it all on one thing, what would it be?",
      "What did you do on your last vacation?",
      "Who is your hero?",
      "What would you sing at Karaoke night?",
      "What was the last movie you went to? What did you think?",
      "What are your hobbies?",
      "How many pairs of shoes do you own?",
      "What's your favorite zoo animal?",
      "If you could go back in time to change one thing, what would it be?",
      "What's your favorite holiday?",
      "What's the most daring thing you've ever done?",
      "What's your favorite type of foreign food?",
      "What is your favorite childhood memory?",
      "What's the craziest thing you've done in the name of love?",
      "Do you collect anything?",
      "Which of the five senses would you say is your strongest?",
      "If you were ruler of your own country what would be the first law you would introduce?",
      "On a scale of 1-10 how funny would you say you are?",
      "What songs have you completely memorized?",
      "What skill would you like to master?",
      "What website do you visit most often?",
      "What do you wish you knew more about?",
      "What's your favorite genre of book or movie?",
      "Where is the most interesting place you've been?",
      "What age do you wish you could permanently be?",
      "Who has impressed you most with what they've accomplished?",
      "What job do you think you'd be really good at?",
      "What pets did you have while you were growing up?",
      "Where would you spend all your time if you could?",
      "What would be your ideal way to spend the weekend?",
      "What one thing do you really want but can't afford?",
      "What is the luckiest thing that has happened to you?",
      "What are you looking forward to in the coming months?",
      "What's the best thing that happened to you last week?",
      "What is the most impressive thing you know how to do?",
      "Who is your favorite entertainer (comedian, musician, actor, etc.)?",
      "What is the meaning of your current username, and how did you came up with it?",
      "To what type of music do you listen to when you're sad?",
      "If you could ditch anything for one day, what would it be?",
      "What games do you like to play?",
      "What three things do you think of the most each day?",
      "If you had a warning label, what would yours say?",
      "Who was your first crush?",
      "What weird or useless talent do you have?",
      "What was the best birthday wish or gift you’ve ever received?",
      "Which TV show do you want your life to be like?",
      "What are the top 3 games you have/want to play?"
    ],
    "pickup": [
      "There is something wrong with my cell phone. It doesn't have your number in it.",
      "On a scale of 1 to 10, you're a 9 and I'm the 1 you need.",
      "Are you a time traveler? Because I see you in my future!",
      "Are you a camera? Because every time I look at you, I smile!",
      "Would you grab my arm, so I can tell my friends I was touched by an angel.",
      "Hey, can I follow you home? My parents told me to follow my dreams.",
      "Is your name Google? Because you have everything I've been searching for.",
      "Kiss me if I'm wrong, but dinosaurs still exist, right?",
      "You must be a magician. Because any time I look at you, everyone else disappears.",
      "Hey, my name's Microsoft. Can I crash at your place?",
      "If nothing lasts forever, will you be my nothing?",
      "Well here I am. What are your other two wishes?",
      "Are your parents bakers? Because you're a cutie pie!",
      "Is there an airport nearby, or was that just my heart taking off?",
      "You know what you'd look really beautiful in? My arms.",
      "Have you been covered in bees recently? I just assumed, because you look sweeter than honey.",
      "Can I take a picture of you so Santa knows what I want for Christmas?",
      "See my friend over there? They want to know if you think I'm cute.",
      "I seem to have lost my phone number. Can I have yours?",
      "I'm learning about important dates in history. Wanna be one of them?",
      "You must be tired because you've been running through my mind all night.",
      "If I could rearrange the alphabet, I'd put ‘U' and ‘I' together.",
      "I must be a snowflake, because I've fallen for you",
      "Were your parents aliens, because you're out of this world.",
      "Hey, you're so gorgeous you made me forget my pickup line.",
      "Are you French? Because Eiffel for you.",
      "I'd never play hide and seek with you because someone like you is impossible to find.",
      "Aside from being sexy, what do you do for a living?",
      "I wish I were cross-eyed so I can see you twice.",
      "You're eyes are like a maze, I'm keep getting lost in them.",
      "Want to make a burger together? I'll provide the meat and you can sandwich it between your buns.",
      "Do you have a pencil? Cause I want to erase your past and write our future.",
      "Hey, you dropped something. I hope it was your standards. Hi, I'm Melody",
      "I really want to wear a dress but I don't have any. Can I slip into you tonight?",
      "Are you country roads, because I wanna take you home.",
      "Did the sun come out or did you just smile at me?",
      "I don't want your candy, what I really want is your number.",
      "Hey there, mind if I take a bite? Cause your decomposing in ALL the right places.",
      "Hi, I'm a zombie, can I eat you out?",
      "I'm going to punch you in the mouth. With my own mouth. Softly. Because I like you.",
      "Is your dad a locksmith because you have the keys to my heart.",
      "There you are, you're on my to do list."
    ],
    "roast": [
      "My phone battery lasts longer than your relationships.",
      "Oh you're talking to me, I thought you only talked behind my back.",
      "My name must taste good because it's always in your mouth.",
      "Don't you get tired of putting make up on two faces every morning?",
      "Too bad you can't count jumping to conclusions and running your mouth as exercise.",
      "Is your drama going to an intermission soon?",
      "I'm an acquired taste. If you don't like me, acquire some taste.",
      "If I wanted a bitch, I would have bought a dog.",
      "My business is my business. Unless you're a thong, get out of my ass.",
      "It's a shame you can't Photoshop your personality.",
      "I don't sugarcoat shit. I'm not Willy Wonka.",
      "Acting like a prick doesn't make yours grow bigger.",
      "Calm down. Take a deep breath and then hold it for about twenty minutes.",
      "Jealousy is a disease. Get well soon, bitch!",
      "When karma comes back to punch you in the face, I want to be there in case it needs help.",
      "You have more faces than Mount Rushmore.",
      "Sorry, sarcasm falls out of my mouth like bullshit falls out of yours.",
      "Don't mistake my silence for weakness. No one plans a murder out loud.",
      "Yes, I am a bitch — just not yours.",
      "I'm sorry you got offended that one time you were treated the way you treat everyone all the time.",
      "Maybe you should eat make-up so you'll be pretty on the inside too.",
      "Being a bitch is a tough job but someone has to do it."
    ],
    "toast": [
      "Even if you were cloned, you'd still be one of a kind. And the better looking one.",
      "It's not easy to be me. Which is why I need you.",
      "I would love to spend every minute of every day with you, but some days I actually have to get stuff done.",
      "Your smile is proof that the best things in life are free.",
      "You are more fun than anyone or anything I know, including bubble wrap.",
      "You're better than a triple-scoop ice cream cone. With sprinkles.",
      "You're more fun than a ball pit filled with candy!",
      "You're better than a triple-scoop ice cream cone. With sprinkles.",
      "Everyone gets knocked down sometimes, but you always get back up and keep going.",
      "You're always learning new things and trying to better yourself, which is awesome.",
      "You're more fun than bubble wrap!",
      "Somehow you make time stop and fly at the same time.",
      "Thank you for being you.",
      "Being around you makes everything better.",
      "I appreciate your friendship more than you can know."
    ]
  };
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
client.on('guildDelete', guild => {
  const hook = new Discord.WebhookClient('866715361097416774', process.env.HOOK);
  hook.send("\"{\"action\":\"removed\""+",\"guild\":\""+guild.name+"\"}\"");
});
client.on('guildCreate', guild => {
  const hook = new Discord.WebhookClient('866715361097416774', process.env.HOOK);
  hook.send("\"{\"action\":\"added\""+",\"guild\":\""+guild.name+"\"}\"");
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
  }else if (command.toLowerCase().startsWith("encode b64 ")){
    const mention = command.substr(11);
    var b64 = Buffer.from(mention, 'utf-8').toString('base64');
    if (b64.length > 2048){
        b64 = b64.substring(0,2039)+"..."
    }
    msg.channel.send(b64);
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
    if (fullstr.length > 2048){
        fullstr = fullstr.substring(0,2039)+"..."
    }
    msg.channel.send(fullstr);
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode hex ")){
    const mention = command.substr(11);
    var bhex = Buffer.from(mention, 'utf-8').toString('hex');
    if (bhex.length > 2048){
        bhex = bhex.substring(0,2039)+"..."
    }
    msg.channel.send(bhex.toUpperCase());
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode url ")){
    const mention = command.substr(11);
    msg.channel.send(encodeURIComponent(mention));
    msg.react("🔒");
  }else if (command.toLowerCase().startsWith("encode")){
    msg.lineReplyNoMention("Usage: `encode [b64/bin/hex/url] [string]`\nE.g. `q!encode b64 sample`");
  }else if (command.toLowerCase().startsWith("decode b64 ")){
    const mention = command.substr(11);
    msg.channel.send(Buffer.from(mention, 'base64').toString('utf-8'));
    msg.react("🔑");
  }else if (command.toLowerCase().startsWith("decode bin ")){
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
    msg.channel.send(fullstr);
    msg.react("🔑");
  }else if (command.toLowerCase().startsWith("decode hex ")){
    const mention = command.substr(11);
    msg.channel.send(Buffer.from(mention, 'hex').toString('utf-8'));
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
			value: '`ping`, `ip`, `whois`, `encode`, `decode`',
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
