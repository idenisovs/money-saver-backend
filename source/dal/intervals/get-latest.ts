import log4js from 'log4js';
import db from '../db';
import { Interval, User } from '../../shared';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';
import done from '../done';

const log = log4js.getLogger('intervals');

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY start DESC LIMIT 1';

export function getLatestInterval(user: User): Promise<Interval> {
	return new Promise((resolve, reject) => {
		log.debug('Retrieving latest interval from database!');

		const params = {
			$userId: user.id,
		};

		db.get(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
