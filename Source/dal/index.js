/**
 * This module is root for all Data Access Layer modules.
 * Created by I. Denisovs on 13.09.2015.
 */
var dal =  {};

dal.intervals = require('./intervals');

dal.payments = require('./payments');

dal.users = require('./users');

module.exports = dal;