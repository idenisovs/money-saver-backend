import {
	Interval, User, DailyExpensesOverview,
} from '../../../../shared';
import dal from '../../../../dal';
import getPaymentsByDate from './get-payments-by-date';
import calculatePaymentsSum from './calculate-payments-sum';
import { daysDiff } from '../../../../shared/utils';
import { DateTime } from 'luxon';

export default async function makeSchedule(interval: Interval, user: User): Promise<DailyExpensesOverview[]> {
	const schedule: DailyExpensesOverview[] = [];

	const payments = await dal.payments.getByDateRange({
		from: interval.start,
		till: interval.end,
	}, user);

	let currentDate = interval.start;
	const days = daysDiff(interval.start, interval.end);

	for (let idx = 0; idx < days; idx++) {
		const dailyPayments = getPaymentsByDate(payments, currentDate);

		schedule.push(new DailyExpensesOverview({
			date: currentDate,
			expenses: calculatePaymentsSum(dailyPayments),
		}));

		currentDate = DateTime.fromISO(currentDate, { zone: user.timezone }).plus({ days: 1 }).toISODate() as string;
	}

	return schedule;
}
