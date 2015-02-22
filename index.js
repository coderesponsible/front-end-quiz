var http    = require('http'),
  exec      = require('child_process').exec,
  fs        = require('fs'),
  obj,
  questions = [];

fs.readFile('questions.json', 'utf8', function (err, data) {
  if (err){
    throw err;
  }else{
    obj = JSON.parse(data);
  }
});

http.createServer(function(req, res) {
  exec('uptime', function(err, stdout, stderr) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end(stderr);
    }
    else {
      //res.writeHead(200,{'Content-Type': 'text/plain'});
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' });
      res.write();

      res.end();
    }
  });
}).listen(8000);
console.log('Node server running');