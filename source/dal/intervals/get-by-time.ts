import db from '../db';
import done from '../done';
import { Interval, User } from '../../shared';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start <= $stamp\n';
sql += 'AND end >= $stamp\n';
sql += 'AND userId = $userId';

type IntervalQuery = {
  time: number
};

export function getByTime(interval: IntervalQuery, user: User): Promise<Interval> {
	return new Promise((resolve, reject) => {
		const params = {
			$stamp: interval.time,
			$userId: user.id,
		};

		db.get(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
