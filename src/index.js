const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let results = [];
let inputs = [];

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/inputs', (req, res) => {
  res.json(inputs);
});

app.post('/inputs', (req, res) => {
  inputs = [
    ...inputs,
    req.body
  ];

  res.send(inputs);
});

app.get('/results', (req, res) => {
  setTimeout(() => {
    res.json(results);
  }, 3200);
});

app.post('/results', (req, res) => {
  results = [
    ...results,
    req.body
  ];

  res.json({message: 'OK'});
});

app.get('/reset', (req, res) => {
  results = [];
  inputs = [];

  res.json({message: 'OK'});
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
