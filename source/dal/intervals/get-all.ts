import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';
import intervalMapper from './interval-mapper';
import IntervalRecord from './interval-record';

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE userId = $userId ORDER BY start DESC';

export function getAll(user: User): Promise<Interval[]> {
    return new Promise((resolve, reject) => {
        const params = {
            '$userId': user.id
        };

        db.all(sql, params, done<IntervalRecord, Interval>(resolve, reject, intervalMapper));
    });

}