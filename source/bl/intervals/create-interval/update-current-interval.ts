import log4js from 'log4js';

import { updateInterval } from '../update-interval';
import { Interval, User } from '../../../shared';
import { daysDiff } from '../../../shared/utils';
import { DateTime } from 'luxon';

const log = log4js.getLogger('create-interval');

export default async function updateCurrentInterval(createdInterval: Interval, latestInterval: Interval, user: User): Promise<void> {
	log.debug('Updating the current interval <%d> of user <%d>...', latestInterval.id, user.id);
	printLatestIntervalEndWarning(createdInterval, latestInterval, user);
	checkInterlacedIntervalStarts(createdInterval, user);
	await updateInterval(latestInterval, user);
}

function printLatestIntervalEndWarning(createdInterval: Interval, latestInterval: Interval, user: User) {
	const today = DateTime.local().setZone(user.timezone);

	log.warn('Latest interval end: %s, Today: %s, Requested start: %s.', latestInterval.end, today, createdInterval.start);
}

function checkInterlacedIntervalStarts(createdInterval: Interval, user: User) {
	const today = DateTime.local().setZone(user.timezone).toISODate() as string;
	const delta = daysDiff(createdInterval.start, today);

	if (!delta) {
		return;
	}

	if (createdInterval.start < today) {
		throw new Error('If intervals interlace, then new interval shall be started today or later!');
	}
}
