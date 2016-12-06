var assert = require('assert');
var procure = require('../');

describe('Procure', function ProcureTest () {
  it('should provide a constructor', function () {
    assert(typeof require('../lib/Procure'), 'function');
  });

  it('should successfully construct an instance', function () {
    var Procure = require('../lib/Procure');
    var procurer = new Procure();

    assert(typeof procurer.procure, 'function');
  });

  it('should procure local files', function (done) {
    procure('./test/fixtures/json.json', function (err, content) {
      assert.ok(content.length);
      done();
    });
  });

  it('should procure remote files', function (done) {
    procure('http://www.google.com/', function (err, content) {
      assert.ok(content.length);
      done();
    });
  });

  it('should provide an error when unable to retrieve a resource', function (done) {
    procure('http://localhost:9876', function (err) {
      assert.ok(err);
      done();
    });
  });

  it('should prefer json for remote files', function (done) {
    procure('https://maki.io/examples', function (err, content) {
      assert.ok(content.length);

      try {
        JSON.parse(content);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should not procure non-existent local files', function (done) {
    procure('./test/fixtures/nope.json', function (err, content) {
      assert.ok(err && !content);
      done();
    });
  });

  it('should not procure non-existent remote files', function (done) {
    procure('http://www.google.com/this-is-a-test-request', function (err, content) {
      assert.ok(err && !content);
      done();
    });
  });
});
