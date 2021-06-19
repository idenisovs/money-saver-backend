import db from '../db';
import { Interval, User } from '../../shared';

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE id = $id AND userId = $userId';

export default async function getIntervalById(intervalId: number, user: User): Promise<Interval> {
    return new Promise((resolve, reject) => {
        const params = {
            $id: intervalId,
            $userId: user.id
        };

        db.get(sql, params, (err: Error, result: Interval) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}