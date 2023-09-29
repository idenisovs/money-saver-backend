import log4js from 'log4js';
import { Summary, User } from '../../../shared';
import getInterval from './get-interval';
import makeSchedule from './make-schedule';
import calculateSchedule from './calculate-schedule';
import calculateTotals from './calculate-totals';

const log = log4js.getLogger('expenses-summary');

export async function getExpensesSummary(intervalId: number | null, user: User): Promise<Summary | null> {
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

	const summary = new Summary();

	summary.interval = interval;

	summary.dailyExpenses = await makeSchedule(interval, user);

	calculateSchedule(summary);

	summary.totals = calculateTotals(summary);

	return summary;
}
