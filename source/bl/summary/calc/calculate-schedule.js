const moment = require('moment');

module.exports = calculateSchedule;

const dateFormat = 'YYYY-MM-DD';

function calculateSchedule(summary)
{
    const intervalNotInSummary = !('interval' in summary) || summary.interval === null;
    const spendingsNotInSummary = !('spendings' in summary) || summary.spendings === null;

    if (intervalNotInSummary || spendingsNotInSummary)
    {
        const message = 'Intervals and Spendings field should be presented in given object.';
        throw new Error(message);
    }

    const startingDay = moment(summary.interval.start).subtract(1, 'days');

    const endingDay = moment(summary.interval.end);

    const daysCount = endingDay.diff(startingDay, 'days', false);

    const dailySum = summary.interval.sum / daysCount;

    let expectedResidual = summary.interval.sum;

    let realResidual = summary.interval.sum;

    const schedule = [];

    for (let day = 0; day < daysCount; day++)
    {
        const dailyValues = {};

        const inc = day > 0 ? 1 : 0;

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

    schedule.shift();

    return schedule;
}

function takeDailySpendings(date, spendings)
{
    for (let i = 0; i < spendings.length; i++)
    {
        if (spendings[i].date === date)
        {
            return spendings[i].sum;
        }
    }

    return 0.0;
}