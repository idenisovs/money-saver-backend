import { Summary, User } from '../../../shared';
import log4js from 'log4js';
import getInterval from './get-interval';
import makeSchedule from './make-schedule';
import calculateSchedule from './calculate-schedule';
import calculateTotals from './calculate-totals';

const log = log4js.getLogger('expenses-summary');

export async function getExpensesSummary(intervalId: number|undefined, user: User): Promise<Summary|null> {
	if (typeof intervalId === 'undefined') {
		log.debug('Calculating summary for latest interval of user <%d>!', user.id);
	} else {
		log.debug('Calculating summary for interval <%d> of user <%d>!', intervalId, user.id);
	}

	const interval = await getInterval(intervalId, user);

	if (!interval) {
		log.warn('User <%d> have no intervals yet, stopping!', user.id);
		return null;
	}

	const summary = new Summary();

	summary.interval = interval;

	summary.days = await makeSchedule(interval, user);

	calculateSchedule(summary);

	summary.totals = calculateTotals(summary);

	return summary;
}