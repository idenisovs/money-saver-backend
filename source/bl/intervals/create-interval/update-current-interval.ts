import moment from 'moment';
import log4js from 'log4js';
import { updateInterval } from '../update-interval';
import getDate from './get-date';
import { Interval, IntervalRecord, User } from '../../../shared';

const LATEST_INTERVAL_END_WARNING = 'Latest interval end: %s, Today: %s, Requested start: %s.';
const INTERVAL_SHALL_START_TODAY_MESSAGE = 'If intervals interlace, then new interval shall be started today or later!';

const log = log4js.getLogger('create-interval');

export default async function updateCurrentInterval(intervalRequest: Interval, latestInterval: Interval|IntervalRecord, user: User): Promise<void> {
	log.debug('Updating current interval...');

	const latestIntervalEnd = getDate(latestInterval.end as number);
	const today = moment().format('YYYY-MM-DD');
	const requested = getDate(intervalRequest.start as number);

	log.warn(LATEST_INTERVAL_END_WARNING, latestIntervalEnd, today, requested);

	const delta = -moment().diff(intervalRequest.start, 'days');

	if (delta < 0) {
		throw new Error(INTERVAL_SHALL_START_TODAY_MESSAGE);
	}

	latestInterval.end = moment(intervalRequest.start).subtract(1, 'days').valueOf();
	latestInterval.user = intervalRequest.user;

	await updateInterval(latestInterval, user);
}