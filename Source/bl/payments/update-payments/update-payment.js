/**
 * Created by I. Denisovs on 17.07.2017..
 */

const log = require('../../../support/logger')();
const dal = require('../../../dal');

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
