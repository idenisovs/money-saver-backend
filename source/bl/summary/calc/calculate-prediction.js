const moment = require('moment');

module.exports = calculatePrediction;

function calculatePrediction(summary)
{
    const today = moment();

    let days = today.diff(summary.interval.start, 'days', true);

    days = Math.ceil(days);

    const schedule = summary.schedule;

    const spendAvg = calculateAverageSpending(schedule, days);

    let currentDay, prevDaysSum;

    for (let d = 0; d < schedule.length; d++)
    {
        currentDay = schedule[d];

        prevDaysSum = (d > 0) ? schedule[d - 1].prediction : currentDay.sum;

        currentDay.prediction = prevDaysSum - spendAvg;
    }
}

function calculateAverageSpending(schedule, days)
{
    const finalDay = Math.min(schedule.length, days);
    let totalSpent = 0;

    for (let d = 0; d < finalDay; d++)
    {
        totalSpent += schedule[d].spent;
    }

    return totalSpent / finalDay;
}