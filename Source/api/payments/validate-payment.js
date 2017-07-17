/**
 *
 * Created by I. Denisovs on 17.07.2017..
 */

const status = require('http-status');
const log = require('log4js').getLogger('validate-payments');

function validatePayments(req, res, next) {
    const payments = req.body.constructor === Array ? req.body : [ req.body ];

    log.debug('Running for %d payments!', payments.length);

    const invalidPayment = payments.find(invalidPayments);

    if (!invalidPayment) {
        return next();
    }

    log.warn('Rejecting payments from user %d, missing Sum field: %j.', req.user.id, invalidPayment);

    req.status(status.EXPECTATION_FAILED).json({ message: 'Sum field is required!', rejected: invalidPayment });
}

module.exports = validatePayments;

function invalidPayments(payment) {
    return !isNumber(payment.sum) && !payment.remove;
}

function isNumber (o) {
    return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}