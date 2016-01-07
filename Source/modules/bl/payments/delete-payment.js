/**
 * Created by Ga5Xz2 on 31.12.2015..
 */

var moment = require('moment');
var util = require('util');
var dal = require('../../dal/dal');

function deletePayments(req, success, error)
{
    var fromDefined = !util.isUndefined(req.query.from);
    var tillDefined = !util.isUndefined(req.query.till);

    if (fromDefined && tillDefined)
    {
        var start = moment(req.query.from).startOf('day').valueOf();
        var end = moment(req.query.till).endOf('day').valueOf();

        var interval = { start: start, end: end };

        dal.payments.deleteByInterval(interval, done);
        return;
    }

    var idDefined = !util.isUndefined(req.params.id);

    if (idDefined)
    {
        dal.payments.deleteById(req.params.id, done);
        return;
    }

    var intervalIdDefined = !util.isUndefined(req.query.intervalId);

    if (intervalIdDefined)
    {
        dal.intervals.getById(req.query.intervalId, intervalRequestDone);
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

        dal.payments.deleteByInterval(interval, done);
    }

    function done(err, removed)
    {
        if (err)
        {
            error(err);
            return;
        }

        success(removed);
    }
}

module.exports = deletePayments;