/**
 * Created by Ga5Xz2 on 19.12.2015..
 */
var moment = require('moment');

module.exports = calculateSchedule;

var dateFormat = 'YYYY-MM-DD';

function calculateSchedule(summary)
{
    var intervalNotInSummary = !('interval' in summary) || summary.interval === null;
    var spendingsNotInSummary = !('spendings' in summary) || summary.spendings === null;

    if (intervalNotInSummary || spendingsNotInSummary)
    {
        var message = 'Intervals and Spendings field should be presented in given object.';
        throw new Error(message);
    }

    var startingDay = moment(summary.interval.start);

    var endingDay = moment(summary.interval.end);

    var daysCount = endingDay.diff(startingDay, 'days') + 2;

    var dailySum = summary.interval.sum / daysCount;

    var expectedResidual = summary.interval.sum;

    var realResidual = summary.interval.sum;

    var schedule = [];

    for (var day = 0; day < daysCount; day++)
    {
        var dailyValues = {};

        var inc = day > 0 ? 1 : 0;

        dailyValues.date = startingDay.add(inc, 'day').format(dateFormat);

        dailyValues.sum = expectedResidual;

        expectedResidual -= dailySum;

        dailyValues.spent = takeDailySpendings(dailyValues.date, summary.spendings);

        realResidual -= dailyValues.spent;

        dailyValues.residual = realResidual;

        dailyValues.balance = dailyValues.residual - dailyValues.sum;

        dailyValues.dailyBalance = dailySum - dailyValues.spent;

        schedule.push(dailyValues);
    }

    return schedule;
}

function takeDailySpendings(date, spendings)
{
    for (var i = 0; i < spendings.length; i++)
    {
        if (spendings[i].date === date)
        {
            return spendings[i].sum;
        }
    }

    return 0.0;
}