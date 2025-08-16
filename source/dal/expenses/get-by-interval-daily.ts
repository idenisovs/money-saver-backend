import log4js from 'log4js';
import db from '../db';
import done from '../done';
import { Expenses, Interval, User } from '../../shared';
import { ExpensesRecord } from './expenses-record';
import expensesMapper from './expenses-mapper';

const log = log4js.getLogger('expenses');

const sql = `
	SELECT 
		date(p.date) AS date,
		sum(p.sum) AS sum
	FROM
		payments p
	WHERE
		p.date >= $from AND p.date <= $till AND userId = $userId
	GROUP BY 
		date
`;

export function getExpensesByIntervalDaily(interval: Interval, user: User): Promise<Expenses[]> {
	return new Promise<Expenses[]>((resolve, reject) => {
		log.debug('Retrieving expenses of user <%d> by interval <%d>!', user.id, interval.id);

		const params = {
			$from: interval.start,
			$till: interval.end,
			$userId: user.id,
		};

		db.all(sql, params, done<ExpensesRecord, Expenses>(resolve, reject, expensesMapper));
	});
}
