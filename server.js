// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html


// HTTP Portion
var http = require('http');
// URL module
var flag=false;
var url = require('url');
var path = require('path');
var json={"name":"", "email":""};
// Using the filesystem module
var fs = require('fs');
/*var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tesi'
    
});
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connesso");
});
var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/prova', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
         
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/home', function (request, response) {
   /* if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }*/
  //  response.sendFile('index.html');
   // response.end();
//});

var server = http.createServer(handleRequest);
server.listen(8080);

console.log('Server started on port 8080');

function handleRequest(req, res) {
  // What did we request?
  
  var pathname = req.url;
 
  let pippo = [];
  
  req.on('data', chunk => {
    pippo.push(chunk);
    console.log("req "+pippo);
 
  });
  req.on('end', () => {
   // console.log(JSON.parse(data));
  //  console.log("ciao 2 "+JSON.parse(pippo));
  //let ciao= "\""+pippo.toString()+"\"";
  console.log("end "+ pippo);

let Spippo=pippo.toString();
json.name=Spippo.slice(Spippo.indexOf("name=")+5,Spippo.indexOf("&"));
//console.log(json.name);
json.email=Spippo.slice(Spippo.indexOf("email=")+6);
console.log("dati "+json.email+" "+ json.name);
//console.log(json.email);
//console.log(Spippo.charAt(Spippo.length));
/*if(json.email.length>1) flag=true;
console.log("flag "+flag);*/
  })
  
  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }
  
  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  var contentType = typeExt[ext] || 'text/plain';

  // User file system module
  fs.readFile(__dirname + pathname,
    // Callback function for reading
    function (err,data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
     

    }
  );
}


// WebSocket Portion
// WebSockets work with the HTTP server

var io = require('socket.io').listen(server);
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
//console.log(json.email.length);
setInterval(function(){io.emit('dati inviati',json.email+" "+json.name);
  //socket.emit('news', json.name+json.email);
  console.log("invio "+json.email+" "+json.name);
json.email=""; json.name="";},1000);

io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
   /* socket.on('mouse',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );*/
    
 
        
 
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);