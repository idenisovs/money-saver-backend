/**
 * Created by I. Denisovs on 31.12.2015..
 */

var moment = require('moment');
var util = require('util');
var log = require('log4js').getLogger('delete-payment');
var dal = require('../../dal');

function deletePayments(req, success, error)
{
    var user = req.user;

    log.trace(user);

    if (req.query.from && req.query.till)
    {
		log.debug('Removing payments by defined From and Till');
		
        var start = moment(req.query.from).startOf('day').valueOf();
        var end = moment(req.query.till).endOf('day').valueOf();

        var interval = { start: start, end: end, user: user };

        dal.payments.deleteByInterval(interval, done);
		
        return;
    }

    if (req.query.id)
    {
		log.debug('Removing payments by id!');
        var payment = { id: req.query.id, user: user };
        dal.payments.deleteById(payment, done);
        return;
    }

    if (req.query.intervalId)
    {
		log.debug('Removing payments by interval id!');
        var interval = { id: req.query.intervalId, user: user };
        dal.intervals.getById(interval, intervalRequestDone);
        return;
    }

    var message = 'No valid data specified! Payments table is not affected!';
    error({ reason: 'params', message: message });

    function intervalRequestDone(err, interval)
    {
        if (err)
        {
            error(err);
            return;
        }

        if (util.isUndefined(interval))
        {
            var message = 'There is no interval with such id: %d!';
            message = util.format(message, req.query.intervalId);
            error({ message: message });
            return;
        }

        interval.user = user;

        dal.payments.deleteByInterval(interval, done);
    }

    function done(err, removed)
    {
        if (err)
        {
            return error(err);
        }

        success(removed);
    }
}

module.exports = deletePayments;