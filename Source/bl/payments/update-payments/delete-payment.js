/**
 * Created by I. Denisovs on 17.07.2017..
 */

const log = require('log4js').getLogger('update-payments');
const deletePayment = require('../delete-payments');

function remove(payment, deferred)
{
    log.debug('Removing payment #%d with sum %d', payment.id, payment.sum);

    const req = { query: payment, user: payment.user };

    deletePayment(req, deferred.resolve, deferred.reject);
}

module.exports = remove;