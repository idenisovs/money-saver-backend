/**
 * This module helps to remove an payment by specified payment's id.
 * Created by I. Denisovs on 17.07.2017..
 */

const log = require('log4js').getLogger('delete-payment');
const dal = require('../../../dal');

function deletePaymentById(req, done) {
    log.debug('Removing payment by id!');

    const payment = { id: req.query.id, user: req.user };

    dal.payments.deleteById(payment, done);
}

module.exports = deletePaymentById;