import { Interval, IntervalSummary, User } from '../../shared';
import dal from '../../dal';

export default async function getIntervalSummary(interval: Interval, user: User): Promise<IntervalSummary> {
	const summary = new IntervalSummary();
	summary.interval = interval;
	summary.expenses.total = await dal.expenses.getByIntervalTotal(interval, user);
	return summary;
}