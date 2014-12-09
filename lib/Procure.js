var fs = require('fs');
var url = require('url');
var request = require('request');

var Procure = function( file , procured ) {
  var info = url.parse( file );

  if (~['http:', 'https:'].indexOf( info.protocol )) {
    request( file , function(err, res, body) {
      if (res.statusCode != 200 ) return procured('non-200 response');
      return procured( err , body );
    });
  } else {
    fs.readFile( file , procured );
  }

};

module.exports = Procure;
