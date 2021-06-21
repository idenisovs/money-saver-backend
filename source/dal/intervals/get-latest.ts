import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';

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

        db.get(sql, params, done<Interval>(resolve, reject));
    });
}