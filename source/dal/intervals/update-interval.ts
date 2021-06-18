import log4js from 'log4js';
import db from '../db';
import { Interval } from '../../shared';

const log = log4js.getLogger('update-interval');

const sql = `UPDATE intervals 
SET 
    sum = $sum,
    start = $start,
    end = $end 
WHERE 
    id = $id 
    AND userId = $userId`;

export default function updateInterval(interval: Interval): Promise<void> {
    return new Promise((resolve, reject) => {
        log.debug('Updating interval record in database!');

        const params = {
            $id: interval.id,
            $userId: interval.user.id,
            $sum: interval.sum,
            $start: interval.start,
            $end: interval.end
        };

        db.run(sql, params, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}