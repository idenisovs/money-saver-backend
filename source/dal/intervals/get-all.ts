import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE userId = $userId ORDER BY start DESC';

export function getAll(user: User): Promise<Interval[]> {
    return new Promise((resolve, reject) => {
        const params = { '$userId': user.id };

        db.all(sql, params, done<Interval[]>(resolve, reject));
    });

}