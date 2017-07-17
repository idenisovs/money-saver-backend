/**
 * This module helps to remove payments in specified time boundaries.
 * Created by I. Denisovs on 17.07.2017..
 */

const moment = require('moment');
const log = require('log4js').getLogger('delete-payment');
const dal = require('../../../dal');

function deletePaymentsByInterval(req, done) {
    log.debug('Removing payments by defined From and Till');

    var start = moment(req.query.from).startOf('day').valueOf();
    var end = moment(req.query.till).endOf('day').valueOf();

    var interval = { start: start, end: end, user: req.user };

    dal.payments.deleteByInterval(interval, done);
}

module.exports = deletePaymentsByInterval;