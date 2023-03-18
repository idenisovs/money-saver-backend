import { Request } from 'express';
import log4js from 'log4js';

import { Interval, User } from '../../shared';
import dal from '../../dal';
import { IntervalQuery } from '../../dal/intervals/get-by-boundary';

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
		const result = await dal.intervals.getByDate({
			date: req.query.date as string,
		}, user);

		return [result];
	}

	const { from, till } = req.query;

	if (from || till) {
		log.debug('Taking interval by boundary: from %s to %s', from, till);

		const query: IntervalQuery = {};

		if (from) {
			query.from = from as string;
		}

		if (till) {
			query.till = till as string;
		}

		return dal.intervals.getByBoundary(query, user);
	}

	log.debug('No query params defined, returning list of all intervals...');

	return dal.intervals.getAll(user);
}
