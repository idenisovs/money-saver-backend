/**
 * Intervals validator middleware.
 *
 * Created by I. Denisovs on 19.07.2017..
 */

const status = require('http-status');
const log = require('../../../support/logger')();
const checkFields = require('./check-fields');

function validateIntervals(req, res, next) {
    log.debug('Checking interval: %j', req.body);

    try {
        checkFields(req.body);
        log.debug('Success!');
        next();
    } catch (err) {
        log.error(err);
        res.status(status.EXPECTATION_FAILED).json({ message: err.toString() });
    }
}

module.exports = validateIntervals;