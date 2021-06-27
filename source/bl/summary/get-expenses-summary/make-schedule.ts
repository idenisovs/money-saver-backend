import { Interval, User } from '../../../shared';
import { Day } from '../../../shared/Day';
import dal from '../../../dal';
import { isSameDay } from '../../../support/dates';

export default async function makeSchedule(interval: Interval, user: User): Promise<Day[]> {
	const schedule: Day[] = [];

	const expenses = await dal.expenses.getByInterval(interval, user);

	const now = new Date(interval.start);

	while(now <= interval.end) {
		const day = new Day();

		day.date = new Date(now);

		const record = expenses.find(e => isSameDay(e.date, day.date));

		if (record) {
			day.expenses = record.sum;
		}

		schedule.push(day);

		now.setDate(now.getDate() + 1);
	}

	return schedule;
}