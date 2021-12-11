var bodyParser = require('body-parser');
var express = require('express');
var app = express();
console.log("Hello World");
app.use("/", bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.method, req.path, "-", req.ip);
  next();
});
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function(req, res) { 
  // res.send('Hello Express'); 
  absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
  });
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
      res.json({
    message: "HELLO JSON"
  });
  }
  else {
  res.json({
    message: "Hello json"
  });}
});

app.get("/:word/echo", (req, res) => {
  res.send({echo: req.params.word});
});

app.get("/name", (req, res) => {

  res.send({name: strng});
});


app.post("/name", (req, res) => {
  var strng = req.body.first + " " + req.body.last;
  res.send({name: strng});
});






















module.exports = app;
