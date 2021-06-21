import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE id = $id AND userId = $userId';

export async function getById(intervalId: number, user: User): Promise<Interval> {
    return new Promise((resolve, reject) => {
        const params = {
            $id: intervalId,
            $userId: user.id
        };

        db.get(sql, params, done<Interval>(resolve, reject));
    });
}