var https = require('https');
var _ = require('underscore');
var geocoder = require('node-geocoder').getGeocoder('google','http');

var freeThings = [];

var parseData = function (thingsData) {
  var i = 1;
  _.each(thingsData, function (thing) {
    setTimeout(function(){
      geocoder.geocode(thing.location)
        .then(function(res){
          formattedEvent = {
            name: thing.name,
            location: {
              lat: res[0].latitude,
              lng: res[0].longitude
            },
            date: thing.date,
            type: 'thing',
            href: thing.href,
          }
          freeThings.push(formattedEvent);
        })
        .catch(function(err){
          console.log("BIG TIME ERRORS:",err);
        });
    }, i*500);
    i++;
  });
  return JSON.stringify(freeThings);
};

var getFreeThings = function (){
  https.get("https://www.kimonolabs.com/api/6qj5yk1o?apikey=fx91ze7M6SuCuKYB7eQNJffHdcjyI8H7", function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    var allData = '';
    res.on('data', function(d) {
      allData+=d;
    });

    res.on('end', function() {
      allData = JSON.parse(allData);
      parseData(allData.results.collection1);
    });

  }).on('error', function(e) {
    console.error(e);
  });
};

var fetchData = function (callback) {
  callback(freeThings);
}

getFreeThings();
module.exports = {
 fetchData: fetchData,
 getFreeThings: getFreeThings,
 data: freeThings
};
