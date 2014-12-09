var express = require('express');
var getCraigData = require('./lib/getCraigslist');
var getBriteData = require('./lib/getEventBrite');
var getGoogData  = require('./lib/getGooglePlaces');

app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  var allData = getCraigData.data.concat(getBriteData.data.concat(getGoogData));
  res.send(allData);
});

app.get('/things', function (req, res) {
  getCraigData.fetchData(function (jsonData){
    res.send(jsonData);
  });
});

app.get('/events', function (req, res) {
  getBriteData.fetchData(function (jsonData) {
    res.send(jsonData);
  });
});

app.get('/places', function (req, res) {
  getGoogData.fetchData(function (jsonData) {
    res.send(jsonData);
  })
})

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

setInterval(function(){
  getBriteData.getFreeEventBriteEvents();
  getCraigData.getFreeThings();
}, 1000000);
