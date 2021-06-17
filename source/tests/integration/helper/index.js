/**
 * Created by I. Denisovs on 02.01.2016..
 */

var helper = {};

helper.login = require('./login');

helper.createInterval = require('./create-interval');

helper.deleteInterval = require('./delete-interval');

helper.clearIntervals = require('./clear-intervals');

helper.payments = require('./payments');

helper.createPayments = require('./create-payments');

helper.deletePayments = require('./delete-payments');

helper.logout = require('./logout');

helper.defaultValidatation = require('./default-validation');

module.exports = helper;