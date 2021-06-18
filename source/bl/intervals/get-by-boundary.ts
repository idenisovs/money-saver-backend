import moment from 'moment';
import log4js from 'log4js';
import dal from '../../dal';
import { ErrorCallback, SuccessCallback } from '../callback-types';
import { Interval } from '../../shared';

const log = log4js.getLogger('get-by-boundary');

export default function getIntervalByBoundary(interval: any, success: SuccessCallback<Interval[]>, error: ErrorCallback) {
    const from = interval.from;

    interval.from = (from === null) ? 0 : moment(from).valueOf();

    const till = interval.till;

    interval.till = (till === null) ? Date.now() : moment(till).valueOf();

    log.debug('Taking all intervals from %d till %d', interval.from, interval.till);
    log.trace(interval);

    dal.intervals.getByBoundary(interval, done);

    function done(err: Error, intervals: Interval[]) {
        if (err) {
            log.error(err);
            error(err);
            return;
        }

        success(intervals);
    }
}