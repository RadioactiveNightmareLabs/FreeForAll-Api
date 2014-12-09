var GooglePlaces = require('googleplaces');
var http = require('http');
var _ = require('underscore');

var freePlaces = [];
var apiKey = 'AIzaSyBCgGVk6a22vWMPte3jfp_u_ajHF9BWVb4';
var requestMethod = 'json';
var googlePlaces = new GooglePlaces(apiKey, requestMethod);
console.log(googlePlaces);

var parameters = {
  location: '37.7806521, -122.4070723',
  radius: 1000,
  types: 'art_gallery|museum|zoo|library',
};

var parseData = function (placeArray) {
  _.each(placeArray, function(place) {
    if (!place['price_level']) {
      googlePlaces.placeDetailsRequest({key: apiKey, reference: place.reference}, function(response) {
        if (response.result){
          place['website'] = response.result.website;
          var placeObject = {
            name: place['name'],
            location: place.geometry.location,
            date: 'today',
            type: 'place',
            href: place.website,
          }
          freePlaces.push(placeObject);
        }
        console.log(response);
      })
    }
  });
};

var getFreeGooglePlaces = function () {
  googlePlaces.placeSearch(parameters, function (data) {
    parseData(data.results);
  });
};

var fetchData = function (callback) {
  callback(freePlaces);
};

getFreeGooglePlaces();
module.exports = {
 fetchData: fetchData,
 getFreeGooglePlaces: getFreeGooglePlaces 
};