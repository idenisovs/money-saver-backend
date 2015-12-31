/**
 * Created by Ga5Xz2 on 26.12.2015..
 */
var util = require('util');
var dal = require('../../dal/dal');

module.exports = deleteInterval;

function deleteInterval(id, success, error)
{
    var result = { intervalsRemoved: 0, paymentsRemoved: 0 };

    dal.intervals.getById(id, intervalRequestDone);

    function intervalRequestDone(err, interval)
    {
        if (err)
        {
            error(err);
            return;
        }

        if (util.isUndefined(interval))
        {
            var message = util.format('There is no Interval with such id: %d!', id);
            error({ reason: 'param', message:  message });
            return;
        }

        dal.payments.deleteByInterval(interval, paymentsRemovalDone);
    }

    function paymentsRemovalDone(err, removed)
    {
        if (err)
        {
            error(err);
            return;
        }

        result.paymentsRemoved = removed;

        dal.intervals.delete(id, done);
    }

    function done(err)
    {
        if (err)
        {
            error(err);
            return;
        }

        result.intervalsRemoved = 1;

        success(result);
    }
}