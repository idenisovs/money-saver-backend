/**
 * Created by I. Denisovs on 19.12.2015..
 */

var dal = require('../../dal/dal');
var calculateSchedule = require('./calc/calculate-schedule');
var calculatePrediction = require('./calc/calculate-prediction');
var calculateTotals = require('./calc/calculate-totals');

module.exports = getLatestIntervalSummary;

function getLatestIntervalSummary(user, success, error)
{
    var result =
    {
        interval: null,
        spendings: null,
        schedule: null,
        totals: null
    };

    var interval = { user: user };

    dal.intervals.getLatest(interval, latestInterval);

    function latestInterval(err, interval)
    {
        if (err)
        {
            return error(err);
        }

        if (!interval)
        {
            return success({});
        }

        result.interval = interval;

        dal.payments.getDailySpendings(interval.id, user.id, dailySpendings);
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

        calculatePrediction(result);

        result.totals = calculateTotals(result);

        success(result);
    }
}