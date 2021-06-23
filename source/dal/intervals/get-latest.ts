import db from '../db';
import { Interval, User } from '../../shared';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY start DESC LIMIT 1';

export function getLatestInterval(user: User): Promise<Interval> {
    return new Promise((resolve, reject) => {
        const params = {
            $userId: user.id
        };

        db.get(sql, params, (err: Error, record: IntervalRecord) => {
            if (err) {
                return reject(err);
            }

            resolve(intervalMapper(record));
        });
    });
}