import db from '../db';
import done from '../done';
import { Interval, User } from '../../shared';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += "strftime('%Y-%m-%d', start) <= $date\n";
sql += "AND strftime('%Y-%m-%d', end) >= $date\n";
sql += 'AND userId = $userId';

type IntervalQuery = {
	date: string
}

export function getByDate(interval: IntervalQuery, user: User): Promise<Interval> {
	return new Promise((resolve, reject) => {
		const params = {
			$date: interval.date,
			$userId: user.id
		};

		db.get(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}