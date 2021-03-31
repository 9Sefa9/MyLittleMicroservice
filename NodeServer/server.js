//-- Server configurations
//SSL Configuration added to server listener. 
//Self created SSL was accomplished by this command: 
//sudo openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout ./selfsigned.key -out selfsigned.crt
const express = require('express');
const https = require('https');
const fs = require('fs');
const port = 3121;

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

app = express()
app.get('/', (req, res) => {
   res.send("Initial Page");
});

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("server startffing on port : " + port)
});