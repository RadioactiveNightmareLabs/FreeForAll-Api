var express = require('express');
var getCraigData = require('./lib/getCraigslist');
var briteData = require('./lib/getEventBrite.js');

app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('home');
});

app.get('/things', function(req, res){
  getCraigData(function (jsonData){
    res.send(jsonData);
  });
});

app.use(function(req, res){
  res.status(404);
  res.send('404 - page not found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send('500 - server error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
  app.get('port') +
  '\npress Ctrl-C to terminate');
});
