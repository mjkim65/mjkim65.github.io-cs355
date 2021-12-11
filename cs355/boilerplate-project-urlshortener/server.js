require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let count = 0;

//getKeyByvalue borrowed from https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

//regex from https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
let obj = {};
app.post('/api/:url', (req, res) => {
  let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  let url = re.exec(req.body.url);
  if (url === null) res.json({ "error": "Invalid URL" });
  else {
    let result = getKeyByValue(obj, url.input);
    if (result === undefined) {
      count++;
      obj[count] = req.body.url;
      res.json({
        "original_url": req.body.url,
        "short_url": count
      })
    }
    else {
      res.json({
        "original_url": req.body.url,
        "short_url": result
      })
    }
  };
});

app.get('/api/shorturl/:shorturl', (req, res) => {
  let shorturl = req.params.shorturl;
  let result = obj[shorturl];
  if (result === undefined) res.json({ "error": "Invalid URL" })
  else res.redirect(obj[shorturl])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
