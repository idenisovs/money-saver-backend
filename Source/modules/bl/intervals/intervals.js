var intervals = {};

intervals.getLatest = require('./get-latest');

intervals.getById = require('./get-by-id');

intervals.getLatestSummary = require('./get-latest-summary');

intervals.create = require('./create-interval');

intervals.delete = require('./delete-interval');

module.exports = intervals;