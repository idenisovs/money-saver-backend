import { Summary, Totals } from '../../../shared';
import getCurrentDay from './get-current-day';

export default function calculateTotals(summary: Summary): Totals {
	const totals = new Totals();

	totals.days = summary.dailyExpenses.length;

	totals.startingSum = summary.interval.sum;

	totals.currentDay = getCurrentDay(summary.interval.start);

	if (totals.currentDay > totals.days) {
		totals.currentDay = totals.days;
	}

	totals.currentDayPercents = totals.currentDay / totals.days;

	totals.expenses = summary.dailyExpenses.reduce((result, day) => result + day.expenses, 0);

	totals.expensesPercent = totals.expenses / totals.startingSum;

	totals.residual = totals.startingSum - totals.expenses;

	totals.residualPercents = totals.residual / totals.startingSum;

	totals.expensesAvg = totals.expenses / totals.currentDay;

	totals.incomesAvg = totals.residual / totals.days;

	totals.expectedResidual = totals.startingSum - (totals.days * totals.expensesAvg);

	totals.expectedResidualPercents = totals.expectedResidual / totals.startingSum;

	return totals;
}
