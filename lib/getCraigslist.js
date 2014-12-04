var https = require('https');

https.get('https://www.kimonolabs.com/api/3wck6h0k?apikey=fx91ze7M6SuCuKYB7eQNJffHdcjyI8H7', function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });

}).on('error', function(e) {
  console.error(e);
});
