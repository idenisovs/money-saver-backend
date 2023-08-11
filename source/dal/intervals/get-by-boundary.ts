import log4js from 'log4js';
import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

const log = log4js.getLogger('get-by-boundary');

let sql = '';

sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start >= $from\n';
sql += 'AND start <= $till\n';
sql += 'AND userId = $userId\n';
sql += 'ORDER BY start DESC';

export type IntervalQuery = {
  from?: string,
  till?: string
};

export function getByBoundary(query: IntervalQuery, user: User): Promise<Interval[]> {
	return new Promise((resolve, reject) => {
		log.trace(query);

		const params = {
			$from: query.from,
			$till: query.till,
			$userId: user.id,
		};

		db.all(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
