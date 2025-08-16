import log4js from 'log4js';

import dal from '../../dal';
import { Interval, User } from '../../shared';

const log = log4js.getLogger('intervals');

export function getByDate(date: string, user: User): Promise<Interval> {
	log.debug('Requesting by date %s', date);

	return dal.intervals.getByDate({
		date: String(date),
	}, user);
}