import { Request } from 'express';
import log4js from 'log4js';

import { Interval, User } from '../../shared';
import dal from '../../dal';
import { getByRange } from './get-by-range';
import { getByDate } from './get-by-date';
import { getByTimestamp } from './get-by-timestamp';

const log = log4js.getLogger('query-intervals');

export async function queryIntervals(req: Request): Promise<Interval[]> {
	log.debug('Query intervals!');
	log.trace(req.query);

	const user = req.user as User;

	if ('timestamp' in req.query) {
		const timestamp = parseInt(String(req.query.timestamp));
		const interval = await getByTimestamp(timestamp, user);
		return [interval];
	}

	if ('date' in req.query) {
		const date = String(req.query.date);
		const interval = await getByDate(date, user);
		return [interval];
	}

	if ('from' in req.query || 'till' in req.query) {
		return getByRange({
			from: req.query.from ? String(req.query.from) : null,
			till: req.query.till ? String(req.query.till) : null,
		}, user);
	}

	log.debug('No query params is defined, returning list of all intervals.');

	return dal.intervals.getAll(user);
}
