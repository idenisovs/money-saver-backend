import { Summary, User } from '../../../shared';
import log4js from 'log4js';
import getInterval from './get-interval';
import makeSchedule from './make-schedule';
import calculateSchedule from './calculate-schedule';
import calculateTotals from './calculate-totals';

const log = log4js.getLogger('payments-summary');

export async function getExpensesSummary(intervalId: number, user: User): Promise<Summary> {
	log.debug('Calculating summary for interval <%d> of user <%d>!', intervalId, user.id);

	const interval = await getInterval(intervalId, user);

	const summary = Summary.fromInterval(interval);

	summary.days = await makeSchedule(interval, user);

	calculateSchedule(summary);

	summary.totals = calculateTotals(summary);

	return summary;
}