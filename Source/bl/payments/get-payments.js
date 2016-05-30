/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var util = require('util');
var moment = require('moment');
var log = require('log4js').getLogger('payments');
var dal = require('../../dal/dal');

module.exports = getPayments;

function getPayments(request, user, success, error)
{
    if ('id' in request)
    {
        log.debug('Taking payments by Id!');
        dal.payments.getById(request.id, user.id, done);
        return;
    }

    if ('date' in request)
    {
        log.debug('Taking payments by date!');
        dal.payments.getByDate(request.date, user.id, done);
        return;
    }

    if (('from' in request) && ('till' in request))
    {
        log.debug('Taking payments by date range!');
        var from = moment(request.from).startOf('day').valueOf();
        var till = moment(request.till).endOf('day').valueOf();
        dal.payments.getByDateRange(from, user.id, till, done);
        return;
    }

    log.debug('Taking payments by latest interval!');
    dal.intervals.getLatest(user.id, getLatestDone);

    function getLatestDone(err, latestInterval)
    {
        if (err)
        {
            return error(err);
        }

        dal.payments.getByIntervalId(latestInterval.id, user.id, done);
    }

    function done(err, payments)
    {
        if (err)
        {
            return error(err);
        }

        success(payments);
    }
}
