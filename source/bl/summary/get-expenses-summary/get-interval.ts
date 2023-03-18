import log4js from 'log4js';
import { Interval, User } from '../../../shared';
import dal from '../../../dal';

const log = log4js.getLogger('summary');

export default function getInterval(intervalId: number | undefined, user: User): Promise<Interval> {
	if (typeof intervalId === 'undefined') {
		log.debug('Requested summary of latest interval!');

		return dal.intervals.getLatest(user);
	}
	log.debug('Requested summary of interval %d', intervalId);

	return dal.intervals.getById(intervalId, user);
}
