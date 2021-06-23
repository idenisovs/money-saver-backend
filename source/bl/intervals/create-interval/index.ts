import moment from 'moment';
import log4js from 'log4js';

import makeInterlaceErrorMessage from './make-interlace-error-message';
import updateCurrentInterval from './update-current-interval';
import finaliseCreation from './finalise-creation';
import dal from '../../../dal';
import { Interval, User } from '../../../shared';

const log = log4js.getLogger('create-interval');

export async function createInterval(interval: Interval, user: User): Promise<Interval> {
	log.debug('Trying to create interval...');

	interval.start = moment(interval.start).startOf('day').toDate();
	interval.end = moment(interval.end).endOf('day').toDate();

	log.debug('Taking latest interval...');

	const latestInterval = await dal.intervals.getLatest(user);

	if (!latestInterval) {
		return await finaliseCreation(interval, user);
	}

	if (interval.start <= latestInterval.start) {
		const message = makeInterlaceErrorMessage(interval, latestInterval);

		throw new Error(message);
	}

	if (interval.start < latestInterval.end) {
		await updateCurrentInterval(interval, latestInterval, user);
	}

	return await finaliseCreation(interval, user);
}



