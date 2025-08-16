import log4js from 'log4js';

import db from '../db';
import { Interval, User } from '../../shared';

const log = log4js.getLogger('expenses');

const sql = `
	select 
	    sum(sum) as amount 
	from payments 
	where 
		date >= $from 
	  and date <= $till 
	  and userId = $userId
`;

export function getExpensesByIntervalTotal(interval: Interval, user: User): Promise<number> {
	log.debug('Retrieving expenses for interval %s-%s of user %d.', interval.start, interval.end, user.id);

	const { promise, resolve, reject } = Promise.withResolvers<number>();

	const params = {
		$from: interval.start,
		$till: interval.end,
		$userId: user.id,
	};

	db.get(sql, params, (err: Error|null, row: Record<string, number>) => {
		if (err) {
			log.error(err);
			reject(err);
		} else {
			resolve(row.amount);
		}
	});

	return promise;
}