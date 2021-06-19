import { RunResult } from 'sqlite3';
import db from '../db';
import { Interval, User } from '../../shared';

const sql = 'DELETE FROM intervals WHERE id = $id AND userId = $userId';

export default function deleteInterval(interval: Interval, user: User): Promise<number> {
    return new Promise((resolve, reject) => {
        const params = {
            $id: interval.id,
            $userId: user.id
        };

        db.run(sql, params, done);

        function done(this: RunResult, err: Error) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes > 0 ? this.lastID : -1)
            }
        }
    });
}