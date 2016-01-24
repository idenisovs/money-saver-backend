/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var util = require('util');
var moment = require('moment');
var dal = require('../../dal/dal');

module.exports = getPayments;

function getPayments(request, success, error)
{
    if ('id' in request)
    {
        dal.payments.getById(request.id, done);
        return;
    }

    if ('date' in request)
    {
        dal.payments.getByDate(request.date, done);
        return;
    }

    if (('from' in request) && ('till' in request))
    {
        var from = moment(request.from).startOf('day').valueOf();
        var till = moment(request.till).endOf('day').valueOf();
        dal.payments.getByDateRange(from, till, done);
        return;
    }

    dal.intervals.getLatest(getLatestDone);

    function getLatestDone(err, latestInterval)
    {
        if (err)
        {
            error(err);
            return;
        }

        dal.payments.getByIntervalId(latestInterval.id, done);
    }

    function done(err, payments)
    {
        if (err)
        {
            error(err);
            return;
        }

        success(payments);
    }
}
