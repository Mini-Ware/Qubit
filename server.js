var http=require('http');
var fs = require("fs");
var markdown = ""
fs.readFile('index.html', function (err, data) {
      markdown = data;
});
var server=http.createServer((function(request,response)
{
  if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request .on('end', function() {
          var post = JSON.stringify(body);
          const Discord = require('discord.js');
          const hook = new Discord.WebhookClient('866715361097416774', process.env.HOOK);
          hook.send(post);
        });
  }else{
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(markdown);
    response.end();
  }
}));
server.listen(7000);