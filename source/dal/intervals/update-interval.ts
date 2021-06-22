import log4js from 'log4js';
import db from '../db';
import { Interval, IntervalRecord, User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('update-interval');

const sql = `UPDATE intervals 
SET 
    sum = $sum,
    start = $start,
    end = $end 
WHERE 
    id = $id 
    AND userId = $userId`;

export function updateInterval(interval: Interval|IntervalRecord, user: User): Promise<void> {
    return new Promise((resolve, reject) => {
        log.debug('Updating interval record in database!');

        const params = {
            $id: interval.id,
            $userId: user.id,
            $sum: interval.sum,
            $start: interval.start,
            $end: interval.end
        };

        log.trace(params);

        db.run(sql, params, done<void>(resolve, reject));
    });
}