procure
=======
[![Build Status](https://travis-ci.org/martindale/procure.svg)](https://travis-ci.org/martindale/procure)
[![Coverage Status](https://coveralls.io/repos/martindale/procure/badge.png?branch=master)](https://coveralls.io/r/martindale/procure?branch=master)

transport-agnostic file procurer

# Quick Start
```javascript
var procure = require('procure');

procure('README.md', function(err, content) {
  // content read from local file...
});

procure('http://www.google.com', function(err, webpage) {
  // content read over HTTP, unparsed HTML provided
});

```
