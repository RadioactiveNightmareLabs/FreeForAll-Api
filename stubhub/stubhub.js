var https = require('https');
var querystring = require('querystring');

var isValid = function(creds) {
    if (creds.consumerKey != null &&
        creds.consumerSecret != null &&
        creds.email != null &&
        creds.password != null)
        return true
    return false
}

var getUserToken = function(creds, callback) {
    if (!isValid(creds)) {
        callback({error:'invalid credentials'})
        return
    }

    var loginBody = {
        'grant_type': 'password',
        'username': creds.email,
        'password': creds.password,
        'scope': 'PRODUCTION'
    }

    var loginBodyForRequest = querystring.stringify(loginBody)

    var options = {
        hostname: 'api.stubhub.com',
        port: 443,
        path: '/login',
        method: 'POST',
        auth: creds.consumerKey + ':' + creds.consumerSecret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-length': loginBodyForRequest.length
        }
    }

    var responseBody = ''
    var request = https.request(options, function(response) {
        response.on('data', function(chunk) {
            console.log('<<<<<<<<<<<<<<<<DATA RECEIVED>>>>>>>>>>>>>>>>');
            responseBody += chunk
        })
        response.on('end', function() {
            //todo: check if can parse
            responseBodyObject = JSON.parse(responseBody)
            if (response.statusCode == 200)
                callback(null, responseBodyObject.access_token)
            else
                callback(responseBodyObject)
        })
    })

    request.on('error', function(e) {
        callback(e)
    })

    request.write(loginBodyForRequest)
    request.end()
}

var searchListings = function(query, callback) {
    var stringifiedQuery = querystring.stringify(query)
    var path = '/search/catalog/events/v2?' + stringifiedQuery

    var options = {
        hostname: 'api.stubhub.com',
        port: 443,
        path: path,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + exports.authorizationToken,
            'Accept': 'application/json',
            'Accept-Encoding': 'application/json'
        }
    }

    var responseBody = ''
    var request = https.request(options, function(response) {
        response.on('data', function(chunk) {
            responseBody += chunk
        })
        response.on('end', function() {
            //todo: check if can parse
            responseBodyObject = JSON.parse(responseBody)
            if (response.statusCode == 200)
                callback(null, responseBodyObject)
            else
                callback(responseBodyObject)
        })
    })

    request.on('error', function(e) {
        callback(e)
    })

    request.end()
}

exports.getUserToken = getUserToken
exports.searchListings = searchListings
exports.searchInventory = searchListings