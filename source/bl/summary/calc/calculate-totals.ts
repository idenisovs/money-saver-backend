import moment from 'moment';
import { IntervalRecord, ScheduleItemRecord, Totals } from '../../../shared';

export default function calculateTotals(schedule: ScheduleItemRecord[], interval: IntervalRecord) {
    const totals: Totals = {
        expectedResidual: 0,
        expectedResidualPercents: 0,
        expensesAvg: 0,
        incomesAvg: 0,
        residual: 0,
        residualPercents: 0,
        days: schedule.length,
        currentDay: getDaysDiff(interval.start, schedule.length),
        currentDayPercents: 0,
        startingSum: interval.sum,
        expenses: 0,
        expensesPercent: 0
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

function getDaysDiff(startingPoint: number, totalDays: number): number {
    const days = moment().diff(startingPoint, 'days', true);

    if (days <= totalDays) {
        return Math.ceil(days);
    } else {
        return totalDays;
    }
}