const log = require('log4js').getLogger('delete-payment');
const dal = require('../../../dal').default;

function deletePaymentById(req, done) {
    log.debug('Removing payment by id!');

    const payment = { id: req.query.id, user: req.user };

    dal.payments.deleteById(payment, done);
}

module.exports = deletePaymentById;