/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var payments = {};

payments.get = require('./get-payments');

payments.save = require('./save-payments');

payments.delete = require('./delete-payment');

payments.update = require('./update-payments');

module.exports = payments;