import {
	Interval, User, DailyExpensesOverview,
} from '../../../../shared';
import dal from '../../../../dal';
import getPaymentsByDate from './get-payments-by-date';
import calculatePaymentsSum from './calculate-paymens-sum';

export default async function makeSchedule(interval: Interval, user: User): Promise<DailyExpensesOverview[]> {
	const schedule: DailyExpensesOverview[] = [];

	const payments = await dal.payments.getByDateRange({
		from: interval.start,
		till: interval.end,
	}, user);

	const currentDate = new Date(interval.start);

	while (currentDate <= interval.end) {
		const dailyPayments = getPaymentsByDate(payments, currentDate);

		schedule.push(new DailyExpensesOverview({
			date: new Date(currentDate),
			expenses: calculatePaymentsSum(dailyPayments),
		}));

		currentDate.setDate(currentDate.getDate() + 1);
	}

	return schedule;
}
