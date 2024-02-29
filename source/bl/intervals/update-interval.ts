import log4js from 'log4js';
import { Interval, User } from '../../shared';
import dal from '../../dal';
import { endOfDay, startOfDay } from '../../shared/utils';

const log = log4js.getLogger('update-interval');

export async function updateInterval(interval: Interval, user: User): Promise<void> {
	log.trace(interval);

	interval.start = startOfDay(interval.start, user.timezone);
	interval.end = endOfDay(interval.end, user.timezone);

	await dal.intervals.update(interval, user);
}
