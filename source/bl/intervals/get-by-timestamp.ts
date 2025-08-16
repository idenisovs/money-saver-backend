import log4js from 'log4js';

import { Interval, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('intervals');

export async function getByTimestamp(timestamp: number, user: User): Promise<Interval> {
	log.debug('Requesting by timestamp %d', timestamp);

	const query = {
		time: timestamp
	};

	return dal.intervals.getByTime(query, user);
}