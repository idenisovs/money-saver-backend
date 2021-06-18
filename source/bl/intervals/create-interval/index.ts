import moment from 'moment';
import log4js from 'log4js';

import dal from '../../../dal';
import makeInterlaceErrorMessage from './make-interlace-error-message';
import updateCurrentInterval from './update-current-interval';
import { Interval } from '../../../shared';

const log = log4js.getLogger('create-interval');

export default async function createInterval(intervalRequest: Interval): Promise<Interval> {
	log.debug('Trying to create interval...');

	intervalRequest.start = moment(intervalRequest.start).startOf('day').valueOf();
	intervalRequest.end = moment(intervalRequest.end).endOf('day').valueOf();

	log.debug('Taking latest interval...');

	const latestInterval = await dal.intervals.getLatest(intervalRequest.user);

	if (!latestInterval) {
		return await finaliseCreate();
	}

	if (intervalRequest.start <= latestInterval.start) {
		const message = makeInterlaceErrorMessage(intervalRequest, latestInterval);

		throw new Error(message);
	}

	if (intervalRequest.start < latestInterval.end) {
		await updateCurrentInterval(intervalRequest, latestInterval);
	}

	return await finaliseCreate();

	async function finaliseCreate() {
		const intervalId = await dal.intervals.create(intervalRequest);

		intervalRequest.id = intervalId!;

		log.debug('Interval successfully saved under %d id!', intervalRequest.id);

		return intervalRequest;
	}
}

