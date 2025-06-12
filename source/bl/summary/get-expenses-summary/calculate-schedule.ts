import { SimpleLinearRegression } from 'ml-regression-simple-linear';

import { DailyExpensesOverview, Summary } from '../../../shared';

export default function calculateSchedule(summary: Summary) {
	const { dailyExpenses } = summary;
	const dailySum = summary.interval.sum / dailyExpenses.length;

	let residuals = summary.interval.sum;
	let balance = 0;

	for (let idx = 0; idx < dailyExpenses.length; idx += 1) {
		const day = dailyExpenses[idx];

		residuals -= day.expenses;

		day.residual.real = residuals;
		day.residual.planned = summary.interval.sum - dailySum * (idx + 1);

		day.balance.daily = dailySum - day.expenses;

		balance += day.balance.daily;

		day.balance.total = balance;
	}

	const forecastingInput = dailyExpenses.map((dailyExpenses: DailyExpensesOverview, idx: number) => ({
		x: idx,
		y: dailyExpenses.residual.real,
		expenses: dailyExpenses.expenses
	}));

	for (let idx = forecastingInput.length - 1; idx >= 0; idx--) {
		const forecastingItem = forecastingInput[idx];
		if (forecastingItem.expenses) {
			break;
		} else {
			forecastingInput.splice(idx, 1);
		}
	}

	const x = forecastingInput.map((row) => row.x);
	const y = forecastingInput.map((row) => row.y);

	const slr = new SimpleLinearRegression(x, y);

	for (let idx = 0; idx < dailyExpenses.length; idx += 1) {
		const day = dailyExpenses[idx];
		day.residual.forecast = slr.predict(idx);
	}
}
