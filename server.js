var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

var port = 3000;
app.listen(port);
console.log('Server started on port:', port);