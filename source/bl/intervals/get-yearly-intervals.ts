import log4js from 'log4js';

import { Interval, IntervalSummary, User } from '../../shared';
import { getByRange } from './get-by-range';
import getIntervalSummary from './get-interval-summary';

const log = log4js.getLogger('intervals');

export async function getYearlyIntervals(year: string, user: User) {
	log.debug('Getting yearly intervals and calculating summary!');

	const range = {
		from: `${year}-01-01`,
		till: `${year}-12-31`
	};

	const intervals: Interval[] = await getByRange(range, user);

	const intervalSummaries: Promise<IntervalSummary>[] = intervals.map((interval) => getIntervalSummary(interval, user))

	return Promise.all(intervalSummaries);
}