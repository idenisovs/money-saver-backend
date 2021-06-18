const moment = require('moment');

module.exports = calculateTotals;

function calculateTotals(summary) {
    const schedule = summary.schedule;

    const totals = {
        days: schedule.length,
        currentDay: getDaysDiff(summary.interval.start, schedule.length),
        currentDayPercents: 0,
        startingSum: summary.interval.sum,
        expenses: 0
    };

    totals.currentDayPercents = totals.currentDay / totals.days;

    let scheduleItem;

    for (let d = 0; d < schedule.length; d++) {
        scheduleItem = schedule[d];

        totals.expenses += scheduleItem.spent;
    }

    totals.expensesPercent = totals.expenses / totals.startingSum;

    totals.residual = totals.startingSum - totals.expenses;

    totals.residualPercents = totals.residual / totals.startingSum;

    totals.expensesAvg = totals.expenses / totals.currentDay;

    totals.incomesAvg = totals.residual / totals.days;

    totals.expectedResidual = totals.startingSum - (totals.days * totals.expensesAvg);

    totals.expectedResidualPercents = totals.expectedResidual / totals.startingSum;

    return totals;
}

function getDaysDiff(startingPoint, totalDays) {
    const days = moment().diff(startingPoint, 'days', true);

    if (days <= totalDays) {
        return Math.ceil(days);
    }

    return totalDays;
}