/**
 * Created by I. Denisovs on 28.12.2015..
 */
const util = require('util');
const moment = require('moment');
const log = require('log4js').getLogger('save-payments');
const dal = require('../../dal');

module.exports = savePayments;

function savePayments(payments, success, error) {
    if (!Array.isArray(payments)) {
        payments = [ payments ];

        payments.user = payments[0].user;

        delete payments[0].user;
    }

    let q = payments.map(savePayment);

    Promise.all(q).then(success, error);
}

function savePayment(payment, idx, payments) {
    setFields(payment);

    payment.user = payments.user;

    log.trace(payment);

    return dal.payments.save(payment);
}

function setFields(payment)
{
    var timeUndefined = util.isUndefined(payment.time);
    var dateUndefined = util.isUndefined(payment.date);

    if (timeUndefined && dateUndefined)
    {
        payment.time = Date.now();
        payment.date = moment(payment.time).format('YYYY-MM-DD');
        return;
    }

	if (!dateUndefined)
	{
		payment.date = moment(payment.date).format('YYYY-MM-DD');
	}

    if (timeUndefined && !dateUndefined)
    {
        payment.time = moment(payment.date).valueOf();
        return;
    }

    if (!timeUndefined && dateUndefined)
    {
        payment.date = moment(payment.time).format('YYYY-MM-DD');
    }
}

