var express = require('express')
  , path = require('path')

  , app = express()
  , app_root = '/';

app.configure(function() {
  app.use(express.static(path.join(app_root, 'assets')));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use('/api', require('./lib/api'));
});

module.exports = app;

app.get('/', function(req, res) {
  res.render('index', {title: 'Home page'});
});
