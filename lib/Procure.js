var fs = require('fs');
var url = require('url');
var request = require('request');
var package = require('../package.json');

/**
 * @class
 */
var Procure = function() {};

/**
* "Procure" a resource, whether local or remote.
* @function procure 
* @param {string} uri Some path to a file.
* @param {Procure~ProcuringComplete} callback Function called on sucess or failure.
*/
Procure.prototype.procure = function( uri , procured ) {
  var info = url.parse( uri );

  if (~['http:', 'https:'].indexOf( info.protocol )) {
    request({
      uri: uri,
      headers: {
        'Accept': 'application/json;q=0.9,*/*;q=0.8',
        'User-Agent': 'procure/' + package.version
      }
    }, function(err, res, body) {
      if (err) return procured( err );
      var statusCode = res.statusCode;
      if (statusCode != 200 ) return procured('non-200 response ' + statusCode);
      return procured( err , body );
    });
  } else {
    fs.readFile( uri , procured );
  }

};

/**
 * The callback function when the file is retrieved (or not).
 * @callback Procure~ProcuringComplete
 * @param {mixed} err Error message, if any.  Null / undefined if none.
 * @param {string} body Body of the requested content.
 */

module.exports = Procure;
