import log4js from 'log4js';

import { Interval, User } from '../../shared';
import { IntervalQuery } from '../../dal/intervals/get-by-range';
import dal from '../../dal';

const log = log4js.getLogger('intervals');

type DateRange = {
	from: string | null,
	till: string | null
};

export function getByRange(range: DateRange, user: User): Promise<Interval[]> {
	log.debug('Requesting intervals by range');
	log.trace(range);

	const intervalQuery: IntervalQuery = {};

	if (range.from) {
		intervalQuery.from = range.from;
	}

	if (range.till) {
		intervalQuery.till = range.till;
	}

	return dal.intervals.getByRange(intervalQuery, user);
}