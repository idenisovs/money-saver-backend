const log = require('log4js').getLogger('update-payment');
const dal = require('../../../dal').default;

function updatePayment(payment, deferred) {
    log.debug('Updating payment #%d with sum %d', payment.id, payment.sum);

    dal.payments.update(payment, done);

    function done(err) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve();
    }
}

module.exports = updatePayment;
