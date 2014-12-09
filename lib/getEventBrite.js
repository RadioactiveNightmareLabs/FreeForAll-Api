var https = require('https');
var _ = require('underscore');

var freeEvents = [];

var parseData = function(eventsData) {
  _.each(eventsData, function(event) {
    if (hasFreeTickets(event.ticket_classes)) {
      formattedEvent = {
        name: event.name.text,
        location: {
          lat: event.venue.address.latitude,
          lng: event.venue.address.longitude
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

var hasFreeTickets = function(ticketClasses) {
  var containsFreeTickets = false;
  _.each(ticketClasses, function(ticket) {
    if (ticket.free) {
      containsFreeTickets = true;
    }
  });
  return containsFreeTickets;
}
var getFreeEventBriteEvents = function() {
  https.get("https://www.eventbriteapi.com/v3/events/search/?venue.city=san+francisco&start_date.keyword=today&token=RUOISS2RFF7WHGOA3Q3F", function(res) {
    var allData = '';
    res.on('data', function(d) {
      allData += d;
    });
    res.on('end', function() {
      allData = JSON.parse(allData);
      parseData(allData.events);
    });
  }).on('error', function(e) {
    console.error('EVENT BRITE ERROR:', e);
  });
};

var fetchData = function(callback) {
  callback(freeEvents);
};

getFreeEventBriteEvents();
module.exports = {
  fetchData: fetchData,
  getFreeEventBriteEvents: getFreeEventBriteEvents,
  data: freeEvents
};
