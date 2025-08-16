import log4js from 'log4js';
import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

const log = log4js.getLogger('get-by-boundary');

const sql = `
	select id, start, end, sum, latest
	from intervals
	where
		start >= $from
		and start <= $till
		and userId = $userId
	order by start desc
`;

export type IntervalQuery = Partial<{
  from: string,
  till: string
}>;

export function getByRange(query: IntervalQuery, user: User): Promise<Interval[]> {
	log.debug('Requesting intervals by range %s - %s!', query.from, query.till);

	const { promise, resolve, reject } = Promise.withResolvers<Interval[]>()

	log.trace(query);

	const params = {
		$from: query.from,
		$till: query.till,
		$userId: user.id,
	};

	db.all(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));

	return promise;
}
