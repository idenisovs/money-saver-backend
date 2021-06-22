import log4js from 'log4js';
import { IntervalRecord, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('summary');

export default function getInterval(intervalId: number, user: User): Promise<IntervalRecord> {
	if (intervalId) {
		log.debug('Requested summary of interval %d', intervalId);

		return dal.intervals.getById(intervalId, user);
	} else {
		log.debug('Requested summary of latest interval!');

		return dal.intervals.getLatest(user);
	}
}