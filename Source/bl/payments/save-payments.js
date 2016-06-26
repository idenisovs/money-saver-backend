/**
 * Created by I. Denisovs on 28.12.2015..
 */
var util = require('util');
var Promise = require('promise');
var moment = require('moment');
var log = require('log4js').getLogger('save-payments');
var dal = require('../../dal/dal');

module.exports = savePayments;

function savePayments(payments, success, error)
{
    var q = [];

    if (!util.isArray(payments))
    {
        payments = [ payments ];

        payments.user = payments[0].user;

        delete payments[0].user;
    }

    try
    {
        payments.forEach(savePayment);

        Promise.all(q).then(success, error);
    }
    catch(err)
    {
        error({ reason: 'params', message: err.toString() });
    }

    function savePayment(payment)
    {
        validate(payment);

        setFields(payment);

        payment.user = payments.user;

        log.trace(JSON.stringify(payment));

        q.push(dal.payments.save(payment));
    }
}

function validate(payment)
{
    if (util.isNumber(payment.sum))
    {
        return;
    }

    var template = 'Sum field (%s) shall be properly defined in Payment object!';
    var message = util.format(template, payment.sum);

    log.error(message);
    log.trace(payment);

    throw new Error(message);
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
        return;
    }
}

