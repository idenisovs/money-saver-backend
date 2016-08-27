/**
 * Root module for data access operations of Intervals.
 * Created by I.Denisovs on 13.09.2015..
 */

var intervals = {};

intervals.getLatest = require('./get-latest');

intervals.getById = require('./get-by-id');

intervals.getByTime = require('./get-by-time');

intervals.getByBoundary = require('./get-by-boundary');

intervals.getAll = require('./get-all');

intervals.create = require('./create');

intervals.update = require('./update-interval');

intervals.delete = require('./delete');

module.exports = intervals;