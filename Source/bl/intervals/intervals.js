var intervals = {};

intervals.getLatest = require('./get-latest');

intervals.getById = require('./get-by-id');

intervals.getByTime = require('./get-by-time');

intervals.getByBoundary = require('./get-by-boundary');

intervals.getLatestSummary = require('./get-latest-summary');

intervals.create = require('./create-interval');

intervals.delete = require('./delete-interval');

module.exports = intervals;