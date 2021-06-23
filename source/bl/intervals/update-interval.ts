import moment from 'moment';
import log4js from 'log4js';
import { Interval, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('update-interval');

export async function updateInterval(interval: Interval, user: User): Promise<void> {
    log.trace(interval);

    interval.end = moment(interval.end).endOf('day').toDate();

    await dal.intervals.update(interval, user);
}