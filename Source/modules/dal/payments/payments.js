/**
 * This module contains data operations for table Payments
 * Created by Ga5Xz2 on 13.09.2015..
 */
var payments = {};

payments.getByIntervalId = require('./get-by-interval-id');

payments.savePayment = require('./save-payment');

payments.getDailySpendings = require('./get-daily-spendings');

module.exports = payments;