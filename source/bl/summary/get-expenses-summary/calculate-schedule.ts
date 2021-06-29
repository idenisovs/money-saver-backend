import { Summary } from '../../../shared';

export default function calculateSchedule(summary: Summary) {
	const { days } = summary;
	const dailySum = summary.interval.sum / days.length;

	let residual = summary.interval.sum;
	let balance = 0;

	for (let idx = 0; idx < days.length; idx++) {
		const day = days[idx];

		residual -= day.expenses;

		day.residual.real = residual
		day.residual.planned = summary.interval.sum - dailySum * (idx + 1);

		day.balance.daily = dailySum - day.expenses;

		balance += day.balance.daily;

		day.balance.total = balance;
	}
}