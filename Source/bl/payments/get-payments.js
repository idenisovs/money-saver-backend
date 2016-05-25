/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var util = require('util');
var moment = require('moment');
var dal = require('../../dal/dal');

module.exports = getPayments;

function getPayments(request, user, success, error)
{
    if ('id' in request)
    {
        dal.payments.getById(request.id, user.id, done);
        return;
    }

    if ('date' in request)
    {
        dal.payments.getByDate(request.date, user.id, done);
        return;
    }

    if (('from' in request) && ('till' in request))
    {
        var from = moment(request.from).startOf('day').valueOf();
        var till = moment(request.till).endOf('day').valueOf();
        dal.payments.getByDateRange(from, user.id, till, done);
        return;
    }

    dal.intervals.getLatest(user.id, getLatestDone);

    function getLatestDone(err, latestInterval)
    {
        if (err)
        {
            error(err);
            return;
        }

        dal.payments.getByIntervalId(latestInterval.id, user.id, done);
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
