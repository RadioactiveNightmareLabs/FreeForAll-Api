var stubhub = require('./../stubhub');
stubhub.authorizationToken = '_Mw8PvXAKEpEOmaBnfxdcFLnc5wa';

var credentials = {
    consumerKey: 'FYPXKHy6B45UesECJJ5NQMmnuzoa',
    consumerSecret: 'PhEj0fGZVNiDRxJ0RrUuSgn4iR8a',
    email: 'cdepman@gmail.com',
    password: ''
}
stubhub.getUserToken(credentials, function(err, userToken) {
    stubhub.authorizationToken = userToken
})

var query = {
    city: 'San Francisco'
}
stubhub.searchListings(query, function(err, data) {
    for(var l in data.listing)
        console.log(data.listing[l].listingId)
})