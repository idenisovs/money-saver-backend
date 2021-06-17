/**
 * Created by I. Denisovs on 26.12.2015..
 */
var util = require('util');
var dal = require('../../dal');

module.exports = deleteInterval;

function deleteInterval(interval, success, error)
{
    var result = { intervalsRemoved: 0, paymentsRemoved: 0 };

    dal.intervals.getById(interval, intervalRequestDone);

    function intervalRequestDone(err, result)
    {
        if (err)
        {
            error(err);
            return;
        }

        if (util.isUndefined(result))
        {
            var message = util.format('There is no Interval with such id: %d!', interval.id);
            error({ reason: 'param', message:  message });
            return;
        }

        result.user = interval.user;

        dal.payments.deleteByInterval(result, paymentsRemovalDone);
    }

    function paymentsRemovalDone(err, removed)
    {
        if (err)
        {
            error(err);
            return;
        }

        result.paymentsRemoved = removed;

        dal.intervals.delete(interval, done);
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