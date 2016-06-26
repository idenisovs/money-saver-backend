/**
 * Created by I. Denisovs on 21.12.2015..
 */
var moment = require('moment');

module.exports = calculatePrediction;

function calculatePrediction(summary)
{
    var today = moment();

    var days = today.diff(summary.interval.start, 'days', true);

    days = Math.ceil(days);

    var schedule = summary.schedule;

    var spendAvg = calculateAverageSpending(schedule, days);

    var currentDay, prevDaysSum;

    for (var d = 0; d < schedule.length; d++)
    {
        currentDay = schedule[d];

        prevDaysSum = (d > 0) ? schedule[d - 1].prediction : currentDay.sum;

        currentDay.prediction = prevDaysSum - spendAvg;
    }
}

function calculateAverageSpending(schedule, days)
{
    var finalDay = Math.min(schedule.length, days);
    var totalSpent = 0;

    for (var d = 0; d < finalDay; d++)
    {
        totalSpent += schedule[d].spent;
    }

    return totalSpent / finalDay;
}