const dotenv = require('dotenv');
dotenv.config();
var Filter = require('bad-words');
filter = new Filter();
filter.removeWords('nazi');
const Discord = require('discord.js');
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
  try{
  if (filter.clean(details.content) != details.content){
    details.delete();
    details.channel.send("Watch your language!! <@"+details.author.id+">");
    return;
  }
  }catch(err){}
  check(details);
});
var id=[];
//chem
var res=[];
var qns = ["What are the steps for crystallisation?","Why does the speed of reaction increase when the concentration of the reactants increases?","Why does the speed of reaction increase when the temperature of the reactants increases?","Why does the speed of reaction increase when the pressure of the gas reactants increases?","Why does the speed of reaction increase when the particle size of solid reactants decreases?","Why does the speed of reaction increase when a catalyst is used?","Which salt preparation method is used to form NOT Group I and NOT ammonium soluble salts?","Which salt preparation method is used to form Group I and ammonium soluble salts?","Which salt preparation method is used to form insoluble salts?","What are the conditions for the Haber Process?","What are the tests for zinc ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What are the tests for lead(II) ion? Name the precipitate formed, its colour and solubility in excess reagent (if any)","What are the tests for calcium ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What are the tests for copper(II) ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What are the tests for iron(II) ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What are the tests for iron(III) ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What are the tests for ammonium ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What are the tests for sodium/potassium ion? Name the precipitate formed, its colour and solubility in excess reagent (if any).","What is the test for nitrate ion? Name the product produced. Include the colour of the product if a precipitate is formed.","What is the test for carbonate ion? Name the product produced. Include the colour of the product if a precipitate is formed.","What is the test for chloride ion? Name the product produced. Include the colour of the product if a precipitate is formed.","What is the test for iodide ion? Name the product produced. Include the colour of the product if a precipitate is formed.","What is the test for sulfate ion? Name the product produced. Include the colour of the product if a precipitate is formed.","What is the test for ammonia gas? State the observation.","What is the test for carbon dioxide gas? State the observation.","What is the test for chlorine gas? State the observation.","What is the test for hydrogen gas? State the observation.","What is the test for oxygen gas? State the observation.","What is the test for sulfur dioxide gas? State the observation.","What is the structure and bonding of ionic compounds?","Why does ionic compounds usually have high melting and boiling points?","Why does magnesium oxide have a higher melting and boiling point than sodium oxide?","Why ionic compounds cannot conduct electricity in solid state but only in molten or aqueous states?","What is the bonding and structure of simple covalent compounds?","What is the bonding and structure of diamond?","What is the bonding and structure of graphite?"];
var ans = [["heat","saturated solution","cool","form","filter","collect","residue","rinse","cold distilled water","remove impurities","dry","between","filter paper"],["more particles per unit volume","frequency of effective collision"],["particles","gain energy","move faster","activation energy","frequency of effective collision"],["particles","forced closer together","smaller volume","more particles per unit volume","frequency of effective collision"],["particles","surface area","collide","frequency of effective collision"],["alternative reaction pathway","particles","activation energy","frequency of effective collision"],["acid reaction"],["titration"],["precipitation"],["temperature","450","pressure","250","atm","catalyst","finely divided iron"],["aqueous sodium hydroxide","aqueous ammonia","soluble","colourless solution","white precipitate","zinc hydroxide"],["aqueous sodium hydroxide","soluble","colourless solution","aqueous ammonia","insoluble","white precipitate","lead(ii) hydroxide"],["aqueous sodium hydroxide","insoluble","aqueous ammonia","no precipitate","white precipitate","calcium hydroxide"],["aqueous sodium hydroxide","insoluble","aqueous ammonia","soluble","blue solution","blue precipitate","copper(ii) hydroxide"],["aqueous sodium hydroxide","aqueous ammonia","insoluble","green precipitate","iron(ii) hydroxide"],["aqueous sodium hydroxide","aqueous ammonia","insoluble","red","brown precipitate","iron(iii) hydroxide"],["aqueous sodium hydroxide","no precipitate","ammonia gas","warm"],["aqueous sodium hydroxide","aqueous ammonia","no precipitate"],["aqueous sodium hydroxide","aluminium","warm","ammonia gas"],["acid","carbon dioxide"],["nitric acid","silver nitrate","silver chloride","white"],["nitric acid","silver nitrate","silver iodide","yellow"],["acid","barium","barium sulfate","white"],["moist red litmus paper","blue"],["bubble","gas into","limewater","white precipitate"],["moist blue litmus paper","red","bleach"],["splint","extinguished","pop","sound"],["glowing splint"],["acidified potassium manganate(vii)","purple","colourless"],["giant ionic lattice structure","ions","strong electrostatic forces of attraction"],["energy","need","overcome","strong electrostatic forces of attraction"],["higher charge","stronger electrostatic forces of attraction"],["fixed positions","strong electrostatic forces of attraction","giant ionic lattice structure","broken down","move freely","conduct electricity"],["strong covalent bond between","weak intermolecular forces of attraction","simple molecular structure"],["strong covalent bond","carbon atom","giant molecular structure","huge network of atom","3d tetrahedral structure"],["strong covalent bond","carbon atom","giant molecular structure","huge network of atom","layer","held by weak intermolecular force"]];
console.log("Number of chem questions: "+qns.length.toString()+"\nNumber of chem answers: "+ans.length.toString())
//hist
var hist_res=[];
var hist_qns = ["What are the terms of the Treaty of Versailles?","What are the reasons for the weakness of the League of Nations?","What are the reasons for the rise of Stalin?","What are the economic impacts on Soviet Union under Stalin's rule?","What are the political impacts on Soviet Union under Stalin's rule?","What are the social impacts on Soviet Union under Stalin's rule?","What are the key failures of the League of Nations?","What are the favourable circumstances that led to the rise of Hitler?","What are Hitler's own abilities that led to the rise of Hitler?","What are the political impacts on Germany under Hitler's rule?","What are the economic impacts on Germany under Hitler's rule?","What are the social impacts on Germany under Hitler's rule?","What are the reasons for the outbreak of World War II?"];
var hist_ans = [["war guilt clause","territorial reduction","demilitarisation","reparation","self","determination","league of nation"],["structural","unanimous vote","authority","credibility","treaty of versailles","post","war attitudes","appeasement"],["non","disclosure of lenin's testament","trotsky's unpopularity","pretended","close to lenin","secretary","general","ideological division"],["collectivisation","collective farm","rapid industrialisation","five","year plan"],["purge","show trail","arrest","execute","propaganda"],["standard of living","famine","fear"],["manchuria","japan","china","puppet government","sanction","abyssinia","italy","invade","conqured"],["weimar government","coalition government","hyperinflation","great depression"],["nazi ideology","charisma","oratorical","deal","membership"],["hitler","power","control"],["employment","infrastructure","business","worker","job","material","war"],["propaganda","censorship","jew","role","women","youth"],["weakness of league of nation","hitler","expansion","rearm","rhineland","spanish civil war","austria","nazi","soviet","pact","poland","policy of appeasement","war"]];
console.log("Number of hist questions: "+hist_qns.length.toString()+"\nNumber of hist answers: "+hist_ans.length.toString())
//phys
var phys_res=[];
var phys_qns = ["What is the SI unit of mass, time, temperature, length, current? Include the name of the unit.","List down the names of all the prefixes learnt and their standard form.","What is the precision of measuring tape, metre rule, vernier calipers and micrometer screw guage in cm?","What is period?","What is frequency?","What is speed and velocity?","What is free fall?","What is terminal vilocity?","What is mass?","What is weight?","What is inertia and it dependent on?","What is gravitational field?","What is moment?","What is the principle of moments?","What is the centre of gravity?","What is stable, unstable and neutral equilibrium","What are the factors affecting stabilty?","What is pressure?","Describe how the height of a liquid column may be used to measure atmospheric pressure.","What is energy? State the name of its SI unit.","What is the principle of conservation of energy?","What is work done?","What is power?","What happens to the pressure of gas when volume is kept constant and temperature increases?","What happens to the pressure of gas when temperature is kept constant and volume increases?","What happens to the volume of gas when pressure is kept constant and temperature increases?","What are the three methods of heat trasfer? Include how is heat trasfered.","What is 0 degree Celsius in Kelvin?","Describe the process of calibration of a liquid-in-glass thermometer.","What is heat capacity?","What is specific heat capacity?","What is latent heat of fusion?","What is latent heat of vaporisation?","What is specific heat of fusion?","Why does temperature remain constant during boiling?","Why does temperature remain constant during freezing?","What are the factors that affect evaporation?","What are the differences between boiling and evaporation?","What is wave motion?","What is wavefront?","What are transverse waves?","What are longitudinal waves?","What is reflection?","What is refraction?","What is critical angle?","When does total internal reflection occur?","What is this type of image? (https://cdn.discordapp.com/attachments/726431879930183800/840839786800873492/uei.jpg)","What is this type of image? (https://cdn.discordapp.com/attachments/726431879930183800/840839786800873492/um2f.jpg)","What is this type of image? (https://cdn.discordapp.com/attachments/726431879930183800/840839786800873492/ue2f.jpg)","What is this type of image? (https://cdn.discordapp.com/attachments/726431879930183800/840839786800873492/flul2f.jpg)","What is this type of image? (https://cdn.discordapp.com/attachments/726431879930183800/840839786800873492/uf.jpg)","What is this type of image? (https://cdn.discordapp.com/attachments/726431879930183800/840839786800873492/ulf.jpg)"];
var phys_ans = [["kilogram","kg","second","s","kelvin","k","metre","m","ampere","a"],["nano","10^-9","micro","10^-6","milli","10^-3","centi","10^-2","deci","10^-1","kilo","10^3","mega","10^6","giga","10^9"],["0.1","0.01","0.001"],["time taken to complete one oscillation"],["number of oscillations produced","per second"],["speed","distance travelled per unit time","distance travelled in a given direction per unit time"],["motion of an object,","influence","gravity only"],["acceleration","zero","travels at constant velocity"],["amount of substance in a body"],["amount of gravitational force acting on a body"],["reluctance of a body to change its state of rest or motion","mass"],["region in which a mass experiences a force due to gravitational attraction"],["turning effect of","force"],["for a body in equilibrium, the sum of clockwise moments about a point is equal to sum of anticlockwise moment about the same point"],["point where the whole weight of the object seems to act on, regardless of its orientation"],["tilted slightly","center of gravity","rises","falls back again","fall farther","same level above the surface supporting it"],["base area","height of centre of gravity above the base"],["force acting per unit area"],["invert","atmospheric pressure","force","into","column","pressure","equal"],["capacity to do work","joule"],["energy cannot be created or destroyed, but can only be converted from one to another","the total energy in an isolated system is constant"],["in the direction of the force"],["the rate of work done"],["increase","temperature","kinetic energy","particle","bombard the wall","more forcefully","more frequently","pressure"],["increase","volume","decrease","molecules per unit volume","bombard the wall","less frequently","pressure"],["increase","temperature","increase","kinetic energy","bombard the wall","more forcefully","more frequently","expand","volume"],["conduction","vibration of particle","convection","density","radiation","infra","red","rays"],["273"],["thermometric substance","two fixed points","ice point","steam point","divide","interval","between","100 equal parts"],["amount of thermal energy required to raise the temperature of a substance by 1"],["amount of thermal energy required to raise the temperature of a unit mass of a substance by 1"],["energy absorbed to overcome the intermolecular forces between","particle","melting"],["energy absorbed to overcome the intermolecular forces between","particle","boiling"],["amount of thermal energy required","change a unit mass of","substance","state","without","change","temperature"],["latent heat","absorbed","overcome","intermolecular forces of attraction","average kinetic energy","remain","constant"],["latent heat","released","intermolecular forces of attraction","strengthened","average kinetic energy","remain","constant"],["exposed surface area","temperature difference","presence of wind","humidity"],["produce","not produce","bubble","fixed temperature","any temperature","within","surface","temperature","constant","cooling","quick process","slow process"],["energy to be transfered from one point to another without transfering matter"],["an imaginary line on the wave that joins all adjacent points that are in phrase"],["travel in a direction perpendicular to the vibration of particles"],["travel in a direction parallel to the vibration of particles"],["light bouncing back"],["bending of light due to a change in speed of light as light rays travel from one optical medium to another"],["angle of incidence","optically denser medium","angle of refraction","optically less dense medium","90"],["light ray","travel","optically denser medium","optically less dense medium","angle of incidence","denser medium","greater","critical angle"],["inverted","real","diminished"],["inverted","real","diminished"],["inverted","real","same size"],["inverted","real","magnified"],["upright","virtual","magnified"],["upright","virtual","magnified"],["upright","virtual","magnified"]];
console.log("Number of phys questions: "+phys_qns.length.toString()+"\nNumber of phys answers: "+phys_ans.length.toString())
var n = 0;
var found = 0;
function check(details){
  console.log(id.toString()+"\n"+res.toString())
  n = -2;
	found = 0;
	while (n < id.length - 1 && found == 0) {
		n = n + 1;
		if (details.author.id == id[n]) {
			found = 1;
		}
               console.log("n: "+n.toString())
	}
  if (found == 0) {
    n = n + 1;
		id.push(details.author.id);
    res.push("");
    hist_res.push("");
    phys_res.push("");
	}
  const w = n;
    if (res[w] == "" && hist_res[w] == "" && phys_res[w] == ""){
      if (details.content.startsWith('q!')) {
	    }else{
        return;
      }
    }else if(res[w] != ""){
      var loop = 0;
      while (loop <= res[w].length){
        if (details.content.toLowerCase().search(res[w][loop]) == -1){
          details.react("❎");
          details.channel.send("That's wrong! Your answer should mention: "+res[w].toString().replace(/[,]/g,", "));
          res[w] = "";
          return;
        }
        loop = loop + 1;
      }
      details.react("✅");
      details.channel.send("That's correct! Here are the important points: "+res[w].toString().replace(/[,]/g,", "));
      res[w] = "";
      return;
    }else if(hist_res[w] != ""){
      var loop = 0;
      while (loop <= hist_res.length){
        if (details.content.toLowerCase().search(hist_res[w][loop]) == -1){
          details.react("❎");
          details.channel.send("That's wrong! Your answer should mention: "+hist_res[w].toString().replace(/[,]/g,", "));
          hist_res[w] = "";
          return;
        }
        loop = loop + 1;
      }
      details.react("✅");
      details.channel.send("That's correct! Here are the important points: "+hist_res[w].toString().replace(/[,]/g,", "));
      hist_res[w] = "";
      return;
    }else if(phys_res[w] != ""){
      var loop = 0;
      while (loop <= phys_res.length){
        if (details.content.toLowerCase().search(phys_res[w][loop]) == -1){
          details.react("❎");
          details.channel.send("That's wrong! Your answer should mention: "+phys_res[w].toString().replace(/[,]/g,", "));
          phys_res[w] = "";
          return;
        }
        loop = loop + 1;
      }
      details.react("✅");
      details.channel.send("That's correct! Here are the important points: "+phys_res[w].toString().replace(/[,]/g,", "));
      phys_res[w] = "";
      return;
    }
  const command = details.content.substr(2);
if (command.startsWith('eval ') && details.author.id == '735753581298319370') {
        details.react("📟");
        const exec = details.content.substr(7);
        try {
            eval(exec);
        } catch (err) {}
  }else if (command=="chem"){
    const ask = Math.floor(Math.random()*qns.length);
    res[w] = ans[ask];
    details.channel.send(qns[ask]);
    details.react("🧪");
  }else if (command=="hist"){
    const ask = Math.floor(Math.random()*hist_qns.length);
    hist_res[w] = hist_ans[ask];
    details.channel.send(hist_qns[ask]);
    details.react("⚔️");
  }else if (command=="phys"){
    const ask = Math.floor(Math.random()*phys_qns.length);
    phys_res[w] = phys_ans[ask];
    details.channel.send(phys_qns[ask]);
    details.react("⚙️");
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
          result = "[Page 0/0]\nhttps://www.spotify.com/";
      }else{
        result="[Page "+(now+1).toString()+"/"+list.length.toString()+"]\n"+list[0];
      }
      msg.edit(result).then(msg => {
        msg.react("⏪");
        msg.react("⏩");
        const rtmp = '⏪';
        const ltmp = '⏩';
        const filter = (react, user) => {
					return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === details.author.id;
				};
        const stamp = msg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          if (react.emoji.name === ltmp && user.id === details.author.id) {
            if (now+1 < list.length){
              now = now+1;
              result=list[now];
              msg.edit("[Page "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result);
            }
          }
          if (react.emoji.name === rtmp && user.id === details.author.id) {
            if (now+1 > 1){
              now = now-1;
              result=list[now];
              msg.edit("[Page "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result);
            }
          }
        });
      });
    });
    });
  }else if (command=="youtube"){
    details.channel.send("Usage: `youtube [video]`\nE.g. `q!youtube tutorial`");
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
          result = "[Page 0/0]\nhttps://www.youtube.com/";
      }else{
        result="[Page "+(now+1).toString()+"/"+list.length.toString()+"]\n"+list[0];
      }
      msg.edit(result.replace("%3F", "?").replace("%3D", "=")).then(msg => {
        msg.react("⏪");
        msg.react("⏩");
        const rtmp = '⏪';
        const ltmp = '⏩';
        const filter = (react, user) => {
					return (react.emoji.name === ltmp || react.emoji.name === rtmp) && user.id === details.author.id;
				};
        const stamp = msg.createReactionCollector(filter, { time: 300000 });
        stamp.on('collect', (react, user) => {
          if (react.emoji.name === ltmp && user.id === details.author.id) {
            if (now+1 < list.length){
              now = now+1;
              result=list[now];
              msg.edit("[Page "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
          if (react.emoji.name === rtmp && user.id === details.author.id) {
            if (now+1 > 1){
              now = now-1;
              result=list[now];
              msg.edit("[Page "+(now+1).toString()+"/"+list.length.toString()+"]\n"+result.replace("%3F", "?").replace("%3D", "="));
            }
          }
        });
      });
    });
    });
  }else if (command=="select"){
    details.channel.send("Usage: `select [items]`\nE.g. `q!select apple banana grape`");
  }else if (command.startsWith("select ")){
    var list = command.substr(7).split(" ")
    var option = Math.floor(Math.random()*list.length)
    details.channel.send(list[option]);
    details.react("💡");
  }else if (command=="dice"){
    details.channel.send("Usage: `dice [sides]`\nE.g. `q!dice 6`");
  }else if (command.startsWith("dice ")){
    var max = command.substr(5)
    var range = Number(max)
    var plot = Math.floor(Math.random()*range)+1
    details.channel.send(plot.toString());
    details.react("🎲");
  }else if (command=="repeat"){
    details.channel.send("Usage: `repeat [expression]`\nE.g. `q!repeat example`");
  }else if (command.startsWith("repeat ")){
    var string = command.substr(7)
    details.channel.send(string);
    details.react("🖨️");
  }else if (command=="invert"){
    details.channel.send("Usage: `invert [expression]`\nE.g. `q!invert example`");
  }else if (command.startsWith("invert ")){
    var string = command.substr(7);
    const unicode = string.split("").reverse().join("").replace(/A/g, "∀").replace(/B/g, "q").replace(/C/g, "Ɔ").replace(/D/g, "p").replace(/E/g, "Ǝ").replace(/F/g, "Ⅎ").replace(/G/g, "פ").replace(/H/g, "H").replace(/I/g, "I").replace(/J/g, "ſ").replace(/K/g, "ʞ").replace(/L/g, "˥").replace(/M/g, "M").replace(/N/g, "N").replace(/O/g, "O").replace(/P/g, "Ԁ").replace(/Q/g, "Q").replace(/R/g, "ɹ").replace(/S/g, "S").replace(/T/g, "┴").replace(/U/g, "∩").replace(/V/g, "Λ").replace(/W/g, "M").replace(/X/g, "X").replace(/Y/g, "⅄").replace(/Z/g, "Z").replace(/a/g, "ɐ").replace(/b/g, "b").replace(/c/g, "ɔ").replace(/d/g, "d").replace(/e/g, "ǝ").replace(/f/g, "ɟ").replace(/g/g, "ƃ").replace(/h/g, "ɥ").replace(/i/g, "ᴉ").replace(/j/g, "ɾ").replace(/k/g, "ʞ").replace(/l/g, "l").replace(/m/g, "ɯ").replace(/o/g, "o").replace(/p/g, "d").replace(/q/g, "b").replace(/r/g, "ɹ").replace(/s/g, "s").replace(/t/g, "ʇ").replace(/u/g, "n").replace(/v/g, "ʌ").replace(/w/g, "ʍ").replace(/x/g, "x").replace(/y/g, "ʎ").replace(/z/g, "z")
    details.channel.send(unicode.replace(/n/g, "u"));
    details.react("🖨️");
  }else if (command=="studly"){
    details.channel.send("Usage: `studly [expression]`\nE.g. `q!studly example`");
  }else if (command.startsWith("studly ")){
    var string = command.substr(7)
    var parts = string.split("");
    var n=0;
    while (n <= string.length-1){
      var found = Math.round(Math.random()*1)
      if (found==0){
          if (parts[n] == parts[n].toUpperCase()){
                parts[n] = parts[n].toLowerCase();
          }else if (parts[n] == parts[n].toLowerCase()){
                parts[n] = parts[n].toUpperCase();
          }
      }
      found = 0;
      n=n+1;
   }
    string = parts.join("");
    details.channel.send(string);
    details.react("🖨️");
  }else if (command=="help"){
    details.channel.send({ embed: {
      color: '#221C35',
      title: "Qubit",
      description: "A simple discord utility bot",
      //https://discord.com/oauth2/authorize?client_id=826031374766440459&permissions=8&scope=bot
      fields: [
		{
			name: 'Random',
			value: '`select`, `dice`',
		},
		{
			name: 'Text',
			value: '`repeat`, `studly`, `invert`',
			inline: false,
		},
		{
			name: 'Media',
			value: '`spotify`, `youtube`',
			inline: false,
		},
		{
			name: 'Subject',
			value: '`chem`, `hist`, `phys`',
			inline: false,
		},
  	],
      image: {
        url: "https://media.tenor.com/images/f1fd8cd005c0139679b161c7e022212d/tenor.gif"
      },
      footer: {
        text: 'Profanity filter is a default feature'
      }
    }});
  }
}
