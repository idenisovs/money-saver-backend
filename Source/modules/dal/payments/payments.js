/**
 * This module contains data operations for table Payments
 * Created by Ga5Xz2 on 13.09.2015..
 */
var db = require('./../db');

var payments = {};

payments.getByIntervalId = require('./get-by-interval-id');

module.exports = payments;