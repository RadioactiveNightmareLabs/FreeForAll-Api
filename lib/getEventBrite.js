var https = require('https');
var _ = require('underscore');

var freeEvents = [];

var parseData = function (eventsData) {
  _.each(eventsData, function (event) {
    if (hasFreeTickets(event.ticket_classes)) {
      formattedEvent = {
        name: event.name.text,
        location: {
          latitude: event.venue.address.latitude,
          longitude: event.venue.address.longitude
        },
        date: event.start.local,
        type: 'event',
        href: event.resource_uri,
      }
      freeEvents.push(formattedEvent);
    }
  });
  return JSON.stringify(freeEvents);
};

var hasFreeTickets = function (ticketClasses) {
  var containsFreeTickets = false;
  _.each(ticketClasses, function(ticket){
    if (ticket.free){
      containsFreeTickets = true;
    }
  });
  return containsFreeTickets;
}
var getFreeEventBriteEvents = function (callback) {
  https.get("https://www.eventbriteapi.com/v3/events/search/?venue.city=san+francisco&start_date.keyword=today&token=RUOISS2RFF7WHGOA3Q3F", function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);
    var allData = '';
    res.on('data', function(d) {
      console.log('<<<<<<<<<<<<<<<DATA CHUNK RECEIVED>>>>>>>>>>>>>>>>')
      allData+=d;
    });

    res.on('end', function() {
      console.log('<<<<<<<<<<<<<<<DATA DELIVERY END>>>>>>>>>>>>>>>>')

      allData = JSON.parse(allData);
      callback(parseData(allData.events));
    });

  }).on('error', function(e) {
    console.error(e);
  });
};

module.exports = getFreeEventBriteEvents;