import log4js from 'log4js';
import db from '../db';
import done from '../done';
import { Expenses, Interval, User } from '../../shared';
import { ExpensesRecord } from './expenses-record';

const log = log4js.getLogger('expenses-by-interval');

const sql = `
SELECT 
	date(p.time) AS date,
	sum(p.sum) AS sum
FROM
	payments p
WHERE
	date >= $from AND date <= $till AND userId = $userId
GROUP BY 
	date
`;

export function getExpensesByInterval(interval: Interval, user: User): Promise<Expenses[]> {
	return new Promise<Expenses[]>((resolve, reject) => {
		log.debug('Retrieving expenses of user <%d> by interval <%d>!', user.id, interval.id);

		const params = {
			$from: interval.start.toISOString(),
			$till: interval.end.toISOString(),
			$userId: user.id
		};

		db.all(sql, params, done<ExpensesRecord, Expenses>(resolve, reject));
	});
}