import log4js from 'log4js';
import { Interval, User } from '../../shared';
import db from '../db';
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

const log = log4js.getLogger('intervals');

const sql = `
SELECT 
    id, start, end, sum, latest 
FROM
		intervals
WHERE
    start < $date
		AND userId = $userId
ORDER BY start DESC LIMIT 1`;

export function getPrevious(interval: Interval, user: User): Promise<Interval | null> {
	log.debug('Retrieving interval previous to interval <%d> from user <%d>!', interval.id, user.id);

	return new Promise((resolve, reject) => {
		const props = {
			$date: interval.start,
			$userId: user.id,
		};

		log.trace(props);

		db.get(sql, props, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
	});
}
