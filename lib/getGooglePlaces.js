var GooglePlaces = require('googleplaces');
var http = require('http');
var _ = require('underscore');

var data = [];
var apiKey = 'AIzaSyBCgGVk6a22vWMPte3jfp_u_ajHF9BWVb4';
var requestMethod = 'json';
var googlePlaces = new GooglePlaces(apiKey, requestMethod);
console.log(googlePlaces);

var parameters = {
  location: '37.7806521, -122.4070723',
  radius: 1000,
  types: 'art_gallery|museum|zoo|library',
}


var parseData = function (placeArray, callback) {
  _.each(placeArray, function(place) {
    googlePlaces.placeDetailsRequest({key: apiKey, placeid: place.place_id}, function(response) {
      place['website'] = response.result.website
      if (!place['price_level']) {
        var placeObject = {
          name: place['name'],
          location: place.geometry.location,
          date: 'today',
          type: 'place',
          href: place.website,
        }
        data.push(placeObject);
        console.log(data);
      }
    })
  })
  callback(data);
};

var getFreeGooglePlaces = function (callback) {
  googlePlaces.placeSearch(parameters, function (data) {
    parseData(data.results, callback);
  });
};

module.exports = getFreeGooglePlaces;

