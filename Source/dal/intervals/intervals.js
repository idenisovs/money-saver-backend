/**
 * This module contains data operations for table Intervals
 * Created by Ga5Xz2 on 13.09.2015..
 */
var db = require('./../db');

var intervals = {};

intervals.getLatest = require('./get-latest');

intervals.getById = require('./get-by-id');

intervals.getByTime = require('./get-by-time');

intervals.getByBoundary = require('./get-by-boundary');

intervals.create = require('./create');

intervals.delete = require('./delete');

module.exports = intervals;