import moment from 'moment';
import log4js from 'log4js';
import { Interval } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('update-interval');

export default async function updateInterval(interval: Interval): Promise<void> {
    log.trace(interval);

    interval.end = moment(interval.end).endOf('day').valueOf();

    await dal.intervals.update(interval);
}