import db from '../db';
import { Interval, User } from '../../shared';
import completeIntervalRequest from './complete-interval-request';

const sql = 'SELECT id, start, end, sum, latest FROM intervals WHERE userId = $userId ORDER BY start DESC';

export function getAll(user: User): Promise<Interval[]> {
    return new Promise((resolve, reject) => {
        const params = {
            '$userId': user.id
        };

        db.all(sql, params, completeIntervalRequest(resolve, reject));
    });

}