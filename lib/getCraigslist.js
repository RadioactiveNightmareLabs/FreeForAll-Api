var https = require('https');
var _ = require('underscore');

var freeThings = [];

var parseData = function (thingsData) {
  _.each(thingsData, function (thing) {
      formattedEvent = {
        name: thing.name,
        location: thing.location,
        date: thing.date,
        type: 'thing',
        href: thing.href,
      }
      freeThings.push(formattedEvent);
  });
  return JSON.stringify(freeThings);
};

var getFreeThings = function (callback){
  https.get("https://www.kimonolabs.com/api/6qj5yk1o?apikey=fx91ze7M6SuCuKYB7eQNJffHdcjyI8H7", function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    var allData = '';
    res.on('data', function(d) {
      allData+=d;
    });

    res.on('end', function() {
      allData = JSON.parse(allData);
      callback(parseData(allData.results.collection1));
    });

  }).on('error', function(e) {
    console.error(e);
  });
};

module.exports = getFreeThings;
