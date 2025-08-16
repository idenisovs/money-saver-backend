import { Request } from 'express';
import log4js from 'log4js';

import { Interval, User } from '../../shared';
import dal from '../../dal';
import { getByRange } from './get-by-range';
import { getByDate } from './get-by-date';

const log = log4js.getLogger('query-intervals');

export async function queryIntervals(req: Request): Promise<Interval[]> {
	const user = req.user as User;
	const time = req.query.timestamp ? req.query.timestamp : null;

	if (time) {
		log.debug('Taking interval by time: %s', time);

		const query = {
			time: parseInt(time as string),
		};

		return [await dal.intervals.getByTime(query, user)];
	}

	if ('date' in req.query) {
		const date = String(req.query.date);
		const interval = await getByDate(date, user);
		return [interval];
	}

	if ('from' in req.query || 'till' in req.query) {
		return getByRange(req.query, user);
	}

	log.debug('No query params defined, returning list of all intervals...');

	return dal.intervals.getAll(user);
}
