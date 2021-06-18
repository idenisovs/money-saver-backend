const log = require('log4js').getLogger('delete-payment');
const deletePayment = require('../delete-payments');

function remove(payment, deferred)
{
    log.debug('Removing payment #%d with sum %d', payment.id, payment.sum);

    const req = { query: payment, user: payment.user };

    deletePayment(req, deferred.resolve, deferred.reject);
}

module.exports = remove;