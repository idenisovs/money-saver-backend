/**
 * This module contains data operations for table Payments
 * Created by Ga5Xz2 on 13.09.2015..
 */
var payments = {};

payments.getByIntervalId = require('./get-by-interval-id');

payments.getDailySpendings = require('./get-daily-spendings');

payments.getByDate = require('./get-by-date');

payments.getByDateRange = require('./get-by-date-range');

payments.getById = require('./get-by-id');

payments.save = require('./save-payment');

payments.deleteByInterval = require('./delete-by-interval');

payments.deleteById = require('./delete-by-id');

module.exports = payments;