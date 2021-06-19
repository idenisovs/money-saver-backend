import { RunResult } from 'sqlite3';
import db from '../db';
import { Interval, User } from '../../shared';

const sql = 'DELETE FROM payments WHERE time BETWEEN $start AND $end AND userId = $userId';

export default function deleteByInterval(interval: Interval, user: User): Promise<number> {
    return new Promise((resolve, reject) => {
        const params = {
            $start: interval.start,
            $end: interval.end,
            $userId: user.id
        };

        db.run(sql, params, done);

        function done(this: RunResult, err: Error) {
            if (err) {
                return reject(err);
            } else {
                resolve(this.changes);
            }
        }
    });
}