var assert = require('assert');
var procure = require('../');

describe('Procure', function() {
  
  it('should procure local files', function( done ) {
    procure('./test/fixtures/test.json', function( err , content ) {
      assert.ok( content.length );
      done();
    });
  });
  
  it('should procure remote files', function( done ) {
    procure('http://www.google.com/', function( err , content ) {
      assert.ok( content.length );
      done();
    });
  });
  
  it('should prefer json for remote files', function( done ) {
    procure('http://maki.ericmartindale.com/examples', function( err , content ) {
      assert.ok( content.length );
      
      try {
        JSON.parse( content );
        done();
      } catch (e) {
        done(e);
      }

    });
  });
  
  it('should not procure non-existent local files', function( done ) {
    procure('./test/fixtures/nope.json', function( err , content ) {
      assert.ok( err && !content );
      done();
    });
  });
  
  it('should not procure non-existent remote files', function( done ) {
    procure('http://www.google.com/this-is-a-test-request', function( err , content ) {
      assert.ok( err && !content );
      done();
    });
  });

});
