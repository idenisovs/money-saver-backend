import { Interval } from '../../shared';

const log = require('log4js').getLogger('update-interval');
const moment = require('moment');
const dal = require('../../dal');

export default async function updateInterval(interval: Interval): Promise<void> {
    return new Promise((resolve, reject) => {
        log.trace(interval);

        interval.end = moment(interval.end).endOf('day').valueOf();

        dal.intervals.update(interval, done);

        function done(err: Error) {
            if (err) {
                reject(err);
            } else {
                resolve()
            }
        }
    });
}