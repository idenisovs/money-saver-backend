import { Interval, User } from '../../shared';
import db from '../db'
import done from '../done';
import IntervalRecord from './interval-record';
import intervalMapper from './interval-mapper';

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY start DESC LIMIT $limit';

export function getNthLatest(limit= 1, user: User): Promise<Interval> {
    return new Promise((resolve, reject) => {
        const params = {
            $userId: user.id,
            $limit: limit
        };

        db.all(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
    })
}