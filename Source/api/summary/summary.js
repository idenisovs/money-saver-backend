/**
 * Created by I.Denisovs on 16.3.7.
 */

var summary = require('express').Router();

summary.get('/payments', require('./get-payments-summary'));

module.exports = summary;

require('log4js').getLogger('api').debug('Summary module is up!');