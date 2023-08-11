import dal from '../../../dal';
import { Interval, User, DailyExpensesOverview } from '../../../shared';
import { isSameDay } from '../../../shared/utils';

export default async function makeSchedule(interval: Interval, user: User): Promise<DailyExpensesOverview[]> {
	const schedule: DailyExpensesOverview[] = [];

	const expenses = await dal.expenses.getByInterval(interval, user);

	const now = new Date(interval.start);

	while (now <= interval.end) {
		const day = new DailyExpensesOverview();

		day.date = new Date(now);

		const record = expenses.find((e) => isSameDay(e.date, day.date));

		if (record) {
			day.expenses = record.sum;
		}

		schedule.push(day);

		now.setDate(now.getDate() + 1);
	}

	return schedule;
}
