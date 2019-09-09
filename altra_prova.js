var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.send('Hello World!');
  
});
app.post('/', function (req, res) {
    res.send('Got a POST request');
    console.log(req.body.name);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});