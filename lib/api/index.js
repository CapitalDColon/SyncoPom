var express = require('express')
  , app = express();

app.get('/', function(req, res) {
  res.send('API is ready');
});

module.exports = app;
