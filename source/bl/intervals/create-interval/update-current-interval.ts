import log4js from 'log4js';
import { updateInterval } from '../update-interval';
import { Interval, User } from '../../../shared';
import { daysDiff, getDateStr, startOfDay } from '../../../shared/utils';
import { DAY } from '../../../shared/constants';

const log = log4js.getLogger('create-interval');

export default async function updateCurrentInterval(createdInterval: Interval, latestInterval: Interval, user: User): Promise<void> {
	log.debug('Updating the current interval <%d> of user <%d>...', latestInterval.id, user.id);

	printLatestIntervalEndWarning(createdInterval, latestInterval);

	checkInterlacedIntervalStarts(createdInterval, user);

	latestInterval.end = new Date(latestInterval.end.getTime() - DAY)

	await updateInterval(latestInterval, user);
}

function printLatestIntervalEndWarning(createdInterval: Interval, latestInterval: Interval) {
	const latestIntervalEnd = getDateStr(latestInterval.end);
	const today = getDateStr(new Date());
	const requested = getDateStr(createdInterval.start);

	log.warn('Latest interval end: %s, Today: %s, Requested start: %s.', latestIntervalEnd, today, requested);
}

function checkInterlacedIntervalStarts(createdInterval: Interval, user: User) {
	const today = startOfDay(new Date(), user.timezone);
	const delta = daysDiff(createdInterval.start, today);

	if (!delta) {
		return;
	}

	if (createdInterval.start.getTime() < today.getTime()) {
		throw new Error('If intervals interlace, then new interval shall be started today or later!');
	}
}
