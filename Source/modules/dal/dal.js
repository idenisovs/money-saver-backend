/**
 * This module is root for all Data Access Layer modules.
 * Created by Ga5Xz2 on 13.09.2015.
 */
var dal =  {};

dal.intervals = require('./intervals');

dal.payments = require('./payments');

module.exports = dal;