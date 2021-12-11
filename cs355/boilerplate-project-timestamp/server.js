// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  let response = {};
  if (!isNaN(Date.parse(date))) {
    response["unix"] = new Date(date).getTime();
    response["utc"] = new Date(date).toUTCString();
    res.json(response);
  }
  else if (!isNaN(parseInt(date))) {
    date = parseInt(date);
    response["unix"] = date;
    response["utc"] = new Date(date).toUTCString();
    res.json(response);
  }
  else {
    res.json({"error": "Invalid Date"})
  }
});

app.get("/api/", (req, res) => {
  let response = {};
  response["unix"] = new Date().getTime();
  response["utc"] = new Date().toUTCString();
  res.json(response);
})
// app.get("/api/1451001600000", (req, res) => {
//   res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
// })
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
