import log4js from 'log4js';
import { ParsedQs } from 'qs';

import { Interval, User } from '../../shared';
import { IntervalQuery } from '../../dal/intervals/get-by-range';
import dal from '../../dal';

const log = log4js.getLogger('intervals');

export function getByRange(query: ParsedQs, user: User): Promise<Interval[]> {
	log.debug('Requesting intervals by range');
	log.trace(query);

	const intervalQuery: IntervalQuery = {};

	if ('from' in query) {
		intervalQuery.from = String(query.from);
	}

	if ('till' in query) {
		intervalQuery.till = String(query.till);
	}

	return dal.intervals.getByRange(intervalQuery, user);
}