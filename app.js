var express = require('express')
  , path = require('path')

  , app = express()
  , app_root = './';

app.configure(function() {
  app.use(express.static(path.join(app_root, 'assets')));
  app.use(express.static(path.join(app_root, 'build')));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use('/api', require('./lib/api'));
});

module.exports = app;

app.get('/partials/:partial', function(req, res) {
  res.render('partials/' + req.params.partial, function(err, html) {
    if (err) {
      res.send(404);
    } else {
      res.end(html);
    }
  });
});

// Everything else goes to Angular
app.get('*', function(req, res) {
  res.render('index', {title: 'Home page'});
});
