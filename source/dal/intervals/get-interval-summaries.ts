import log4js from 'log4js';

import { IntervalQuery } from './IntervalQuery';
import { Interval, IntervalSummary, User } from '../../shared';
import db from '../db';
import { IntervalSummaryRecord } from './interval-summary-record';

const log = log4js.getLogger('intervals');

const sql = `
	select id, start, end, sum, days, daily_balance, expenses, average_expenses
	from interval_summaries
	where 
    	userId = $userId
		and start <= $till
		and end >= $from
`;

export function getIntervalSummaries(query: IntervalQuery, user: User): Promise<IntervalSummary[]> {
	log.debug('Requesting interval summaries view for range %s - %s', query.from, query.till);

	const { promise, resolve, reject } = Promise.withResolvers<IntervalSummary[]>()

	const params = {
		$from: query.from,
		$till: query.till,
		$userId: user.id,
	};

	log.trace(params);

	db.all(sql, params, (err: Error|null, rows: IntervalSummaryRecord[])=> {
		if (err) {
			log.error(err);
			reject(err);
			return;
		}

		const summaries = rows.map((row: IntervalSummaryRecord) => {
			const summary = new IntervalSummary()

			summary.dailyBalance = row.daily_balance;

			summary.expenses.total = row.expenses;
			summary.expenses.average = row.average_expenses;

			summary.interval = new Interval();

			summary.interval.id = row.id;
			summary.interval.start = row.start;
			summary.interval.end = row.end;
			summary.interval.sum = row.sum;

			return summary;
		});

		resolve(summaries);
	});

	return promise;
}