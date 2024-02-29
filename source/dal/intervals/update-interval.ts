import log4js from 'log4js';
import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

const log = log4js.getLogger('update-interval');

const sql = `UPDATE intervals 
SET 
    sum = $sum,
    start = $start,
    end = $end,
		latest = $latest
WHERE 
    id = $id 
    AND userId = $userId`;

export function updateInterval(interval: Interval, user: User): Promise<void> {
	return new Promise((resolve, reject) => {
		log.debug('Updating interval record in database!');

		const params = {
			$id: interval.id,
			$userId: user.id,
			$sum: interval.sum,
			$start: interval.start.toISOString(),
			$end: interval.end.toISOString(),
			$latest: interval.latest
		};

		log.trace(params);

		db.run(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
