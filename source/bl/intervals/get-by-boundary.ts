import moment from 'moment';
import log4js from 'log4js';
import dal from '../../dal';
import { Interval, User } from '../../shared';
import { IntervalQuery } from '../../dal/intervals';

const log = log4js.getLogger('get-by-boundary');

export function getIntervalByBoundary(query: IntervalQuery, user: User): Promise<Interval[]> {
    const { from, till } = query;

    query.from = typeof from === 'undefined' ? 0 : moment(from).valueOf();
    query.till = typeof till === 'undefined' ? Date.now() : moment(till).valueOf();

    log.debug('Taking all intervals from %d till %d', query.from, query.till);
    log.trace(query);

    return dal.intervals.getByBoundary(query, user);
}