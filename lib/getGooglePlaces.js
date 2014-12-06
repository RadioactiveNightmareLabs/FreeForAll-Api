GooglePlaces = require('googleplaces');
http = require('http');
_ = require('underscore');

var data = [];
var apiKey = 'AIzaSyBCgGVk6a22vWMPte3jfp_u_ajHF9BWVb4';
var requestMethod = 'json';
var googlePlaces = new GooglePlaces(apiKey, requestMethod);

var parameters = {
  location: '37.7806521, -122.4070723',
  radius: 1000,
  types: 'art_gallery|museum|zoo|library',
}

var parseData = function (placeArray) {
  _.each(placeArray, function(place){
    if (!place['price_level']){
      var placeObject = {
        name: place['name'],
        location: place.geometry.location,
        date: 'today',
        type: 'Venue',
        href: event.resource_uri,
        }
        data.push(placeObject);
        console.log(data);
      }
    })
};

var getFreeGooglePlaces = function () {
  googlePlaces.placeSearch(parameters, function (data) {
    parseData(data.results);
    // console.log(data.results);  
  });
};

getFreeGooglePlaces();

