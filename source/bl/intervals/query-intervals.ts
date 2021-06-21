import { Request } from 'express';
import log4js from 'log4js';

import { Interval, User } from '../../shared';
import getIntervalByBoundary from './get-by-boundary';
import { IntervalQuery } from '../../dal/intervals';
import dal from '../../dal';

const log = log4js.getLogger('query-intervals');

export default async function queryIntervals(req: Request): Promise<Interval[]> {
	const user = req.user as User;
	const time = req.query.timestamp ? req.query.timestamp : null;

	if (time) {
		log.debug('Taking interval by time: %s', time);

		let query = {
			time: parseInt(time as string)
		};

		return [ await dal.intervals.getByTime(query, user) ];
	}

	const { from, till } = req.query;

	if (from || till) {
		log.debug('Taking interval by boundary: from %s to %s', from, till);

		const query: IntervalQuery = {};

		if (from) {
			query.from = parseInt(from as string);
		}

		if (till) {
			query.till = parseInt(till as string);
		}

		return await getIntervalByBoundary(query, user);
	}

	log.debug('No query params defined, returning list of all intervals...');

	return await dal.intervals.getAll(user);
}