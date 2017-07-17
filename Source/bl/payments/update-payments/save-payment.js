/**
 * Created by I. Denisovs on 17.07.2017..
 */

const moment = require('moment');
const log = require('log4js').getLogger('update-payments');
const save = require('../save-payments');

function savePayment(payment, deferred) {
    payment.date = moment(payment.time).format('YYYY-MM-DD');
    log.debug('Saving payment on %s for %s...', payment.date, payment.sum);
    save(payment, deferred.resolve, deferred.reject);
}

module.exports = savePayment;
