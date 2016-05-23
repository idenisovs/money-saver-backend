/**
 * This module is root for all Data Access Layer modules.
 * Created by Ga5Xz2 on 13.09.2015.
 */
var dal =  {};

dal.intervals = require('./intervals/intervals');

dal.payments = require('./payments/payments');

dal.users = require('./users/users');

module.exports = dal;