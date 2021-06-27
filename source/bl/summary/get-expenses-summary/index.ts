import { Summary, User } from '../../../shared';
import log4js from 'log4js';
import getInterval from './get-interval';
import makeSchedule from './make-schedule';
import calculateSchedule from './calculate-schedule';
import calculateTotals from './calculate-totals';

const log = log4js.getLogger('expenses-summary');

export async function getExpensesSummary(intervalId: number, user: User): Promise<Summary|null> {
	if (intervalId) {
		log.debug('Calculating summary for interval <%d> of user <%d>!', intervalId, user.id);
	} else {
		log.debug('Calculating summary for latest interval of user <%d>!', user.id);
	}

	const interval = await getInterval(intervalId, user);

	if (!interval) {
		log.warn('User <%d> have no intervals yet, stopping!', user.id);
		return null;
	}

	const summary = Summary.fromInterval(interval);

	summary.days = await makeSchedule(interval, user);

	calculateSchedule(summary);

	summary.totals = calculateTotals(summary);

	return summary;
}