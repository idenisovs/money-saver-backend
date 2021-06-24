import db from '../db';
import { Interval, SpendingRecord, User } from '../../shared';
import done from '../done';

let sql = '';

sql += 'SELECT date(p.time) AS date, sum(p.sum) AS sum\n';
sql += 'FROM intervals i\n';
sql += 'LEFT OUTER JOIN payments p ON p.time > i.start AND p.time <= i.end\n';
sql += 'WHERE i.id = $id AND p.userId = $userId\n';
sql += 'GROUP BY date\n';

export function getDailySpendings(interval: Interval, user: User): Promise<SpendingRecord[]> {
    return new Promise((resolve, reject) => {
        const params = {
            '$id': interval.id,
            '$userId': user.id
        };

        db.all(sql, params, done<SpendingRecord[]>(resolve, reject));
    });
}