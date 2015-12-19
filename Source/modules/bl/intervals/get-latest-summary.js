/**
 * Created by Ga5Xz2 on 19.12.2015..
 */

var dal = require('../../dal/dal');

module.exports = getLatestIntervalSummary;

function getLatestIntervalSummary(success, error)
{
    var result =
    {
        interval: null,
        spendings: null,
        totals: null
    };

    dal.intervals.getLatest(latestInterval, error);

    function latestInterval(interval)
    {
        result.interval = interval;

        dal.payments.getDailySpendings(interval.id, dailySpendings);
    }

    function dailySpendings(err, dailySpendings)
    {
        if (err)
        {
            error(err);
            return;
        }

        result.spendings = dailySpendings;

        calculateTotals();
    }

    function calculateTotals()
    {
        success(result);
    }
}