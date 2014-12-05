var https = require('https');
var _ = require('underscore');

var yelp = require('yelp').createClient({
  consumer_key: "-rX3oCdLqbRJpOvPAYEMVg", 
  consumer_secret: "fZ0CKS4BIBjr0AacOn6EO2Uk8n0",
  token: "pq-i2FgNODwsvsRDQth5GCBYnq2gjFxQ",
  token_secret: "RnxW6WPF-ccHx-q-600a3m-iUbs"
});


yelp.search({term: "food", location: "944 Market Street, #8 San Francisco, CA 94102", deals_filter: true, radius_filter: 5000}, function(error, data) {
  console.log(error);
  // console.log(data);
  parseData(data.businesses);
});


var parseData = function (businesses) {
  _.each(businesses, function (business) {
    // console.log('BUSINESS:', business);
    console.log('DEALS:',business.deals[0].title);
  });
}