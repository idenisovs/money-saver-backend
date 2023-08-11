import { RunResult } from 'sqlite3';
import log4js from 'log4js';
import db from '../../db';
import { Interval, User } from '../../../shared';

const log = log4js.getLogger('create-interval');

const sql = 'INSERT INTO intervals (start, end, sum, userId, latest) VALUES ($start, $end, $sum, $userId, $latest)';

export default function createInterval(interval: Interval, user: User): Promise<number> {
	return new Promise((resolve, reject) => {
		log.debug('Inserting new interval!');

		const params = {
			$start: interval.start.toISOString(),
			$end: interval.end.toISOString(),
			$sum: interval.sum,
			$userId: user.id,
			$latest: 1,
		};

		log.trace(params);

		db.run(sql, params, done);

		function done(this: RunResult, err: Error) {
			if (err) {
				log.error(err);
				reject(err);
			} else {
				log.debug('Interval inserted!');
				resolve(this.lastID);
			}
		}
	});
}
