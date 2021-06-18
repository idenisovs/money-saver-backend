import { format } from 'util';
import moment from 'moment';
import log4js from 'log4js';
import updateInterval from './update-interval';
import dal from '../../dal';
import { Interval } from '../../shared';
import { ErrorCallback, SuccessCallback } from '../callback-types';

const interlaceError = 'New interval should not be set (%s) before latest (%s)!';
const latestIntervalEndWarning = 'Latest interval end: %s, Today: %s, Requested start: %s.';
const intervalShallStartedTodayMessage = 'If intervals interlace, then new interval shall be started today or later!';

const log = log4js.getLogger('create-interval');

export default function createInterval(intervalRequest: any, success: SuccessCallback<Interval>, error: ErrorCallback<Error|{ reason: string }>) {
	log.debug('Trying to create interval...');

	intervalRequest.start = moment(intervalRequest.start).startOf('day').valueOf();
	intervalRequest.end = moment(intervalRequest.end).endOf('day').valueOf();

	log.debug('Taking latest interval...');

	dal.intervals.getLatest(intervalRequest, checkIntervalPosition);

	function checkIntervalPosition(err: Error, latestInterval: Interval) {
		if (err) {
			return error(err);
		}

		if (!latestInterval) {
			return saveNewInterval();
		}

		if (intervalRequest.start <= latestInterval.start) {
			return interlaceErrorMessage(latestInterval);
		}

		if (intervalRequest.start < latestInterval.end) {
			return updateCurrentInterval(latestInterval);
		}

		saveNewInterval();
	}

	function interlaceErrorMessage(latestInterval: Interval) {
		const newInt = getDate(intervalRequest.start);
		const latInt = getDate(latestInterval.start as number);

		const message = format(interlaceError, newInt, latInt);

		error({
            reason: message
        });
	}

	function updateCurrentInterval(latestInterval: Interval) {
		const latestIntervalEnd = getDate(latestInterval.end as number);
		const today = moment().format('YYYY-MM-DD');
		const requested = getDate(intervalRequest.start);

		log.warn(latestIntervalEndWarning, latestIntervalEnd, today, requested);

		const delta = -moment().diff(intervalRequest.start, 'days');

		if (delta < 0) {
			return error({
                reason: intervalShallStartedTodayMessage
            });
		}

		latestInterval.end = moment(intervalRequest.start).subtract(1, 'days').valueOf();
		latestInterval.user = intervalRequest.user;

		updateInterval(latestInterval, saveNewInterval, error);
	}

	function saveNewInterval() {
		log.debug('Saving interval!');

		dal.intervals.create(intervalRequest, done);
	}

	function done(err: Error|null, intervalId?: number) {
		if (err) {
			log.error('Save failed!');

			return error(err);
		}

        intervalRequest.id = intervalId

		log.debug('Interval successfully saved under %d id!', intervalRequest.id);

		success(intervalRequest);
	}
}

function getDate(timestamp: number) {
	return moment(timestamp).format('YYYY-MM-DD');
}