import db from '../db';
import done from '../done';
import { Interval, User } from '../../shared';

let sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start <= $stamp\n';
sql += 'AND end >= $stamp\n';
sql += 'AND userId = $userId';

type IntervalQuery = {
    time: number
}

export function getByTime(interval: IntervalQuery, user: User): Promise<Interval> {
    return new Promise((resolve, reject) => {
        const params = {
            $stamp: interval.time,
            $userId: user.id
        };

        db.get(sql, params, done<Interval>(resolve, reject));
    });
}