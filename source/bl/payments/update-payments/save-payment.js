const moment = require('moment');
const log = require('log4js').getLogger('save-payment');
const save = require('../save-payments');

function savePayment(payment, deferred) {
    if (!payment.time) {
        payment.time = Date.now();
    }

    if (!payment.date) {
        payment.date = moment(payment.time).format('YYYY-MM-DD');
    }

    log.debug('Saving new payment <%d> on %s...', payment.sum, payment.date);

    save(payment, deferred.resolve, deferred.reject);
}

module.exports = savePayment;
