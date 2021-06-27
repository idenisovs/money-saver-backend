import { Summary, Totals } from '../../../shared';
import { daysDiff } from '../../../support/dates';

export default function calculateTotals(summary: Summary): Totals {
    const totals = new Totals();

    totals.days = summary.days.length;

    totals.startingSum = summary.sum;

    totals.currentDay = daysDiff(summary.start, new Date()) + 1;

    totals.currentDayPercents = totals.currentDay / totals.days;

    totals.expenses = summary.days.reduce((result, day) => {
        return result + day.expenses;
    }, 0);

    totals.expensesPercent = totals.expenses / totals.startingSum;

    totals.residual = totals.startingSum - totals.expenses;

    totals.residualPercents = totals.residual / totals.startingSum;

    totals.expensesAvg = totals.expenses / totals.currentDay;

    totals.incomesAvg = totals.residual / totals.days;

    totals.expectedResidual = totals.startingSum - (totals.days * totals.expensesAvg);

    totals.expectedResidualPercents = totals.expectedResidual / totals.startingSum;

    return totals;
}