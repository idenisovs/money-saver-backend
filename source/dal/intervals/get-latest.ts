import db from '../db';
import { Interval } from '../../shared';

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY start DESC LIMIT 1';

export default async function getLatest(interval: Interval): Promise<Interval> {
    return new Promise((resolve, reject) => {
        const params = {
            $userId: interval.user.id
        };

        db.get(sql, params, (err: Error, interval: Interval) => {
            if (err) {
                reject(err);
            } else {
                resolve(interval);
            }
        });
    });
}