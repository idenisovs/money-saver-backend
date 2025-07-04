import log4js from 'log4js';
import { Interval, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('update-interval');

export async function updateInterval(interval: Interval, user: User): Promise<void> {
	log.trace(interval);
	await dal.intervals.update(interval, user);
}
