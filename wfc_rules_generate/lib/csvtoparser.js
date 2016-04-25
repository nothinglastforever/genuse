var csv = require('csv-streamify')
  , StreamCombiner = require('./streamcombiner')
  , parser = require('./parser');

module.exports = function(options) {
  // Buffer of CSV data file going in
  // JavaScript objects going out
  return new StreamCombiner(csv({ delimiter: '|', newline: '\r', objectMode: true}),
                            parser(options));
};
