// index.js
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

app.get('/api', (req, res) => {
  res.json({'unix': Math.floor(new Date().getTime()), 'utc': new Date().toUTCString()})
})

app.get('/api/:date?', (req, res, next) => {
  if (!new Date(req.params.date).getTime()) {
    let dateInt = parseInt(req.params.date)
    req.unix = dateInt;
    req.date = new Date(dateInt);
  } else if (!req.params.date) {
    req.date = new Date();
  } else {
    req.unix = new Date(req.params.date).getTime();
    req.date = new Date(req.params.date);
  }
  next();
}, (req, res) => {
  if (req.date.toString() !== "Invalid Date") {
    res.json({unix: req.unix, utc: req.date.toUTCString()})
  } else {
    res.json({error: "Invalid Date"})
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
