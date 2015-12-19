/**
 * Created by Ga5Xz2 on 19.12.2015..
 */

var dal = require('../../dal/dal');
var calculateSchedule = require('../../calculators/calculate-schedule');
var calculateTotals = require('../../calculators/calculate-totals');

module.exports = getLatestIntervalSummary;

function getLatestIntervalSummary(success, error)
{
    var result =
    {
        interval: null,
        spendings: null,
        totals: null
    };

    dal.intervals.getLatest(latestInterval);

    function latestInterval(err, interval)
    {
        if (err)
        {
            error(err);
            return;
        }

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

        calculate();
    }

    function calculate()
    {
        result.schedule = calculateSchedule(result);

        result.totals = calculateTotals(result);

        success(result);
    }
}