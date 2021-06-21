import log4js from 'log4js';
import db from '../db';
import { Interval, User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('get-by-boundary');

let sql = '';

sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start >= $from\n';
sql += 'AND start <= $till\n';
sql += 'AND userId = $userId';

export type IntervalQuery = {
    from?: number,
    till?: number
};

export default function getByBoundary(query: IntervalQuery, user: User): Promise<Interval[]> {
    return new Promise((resolve, reject) => {
        log.trace(query);

        const params = {
            $from: query.from,
            $till: query.till,
            $userId: user.id
        };

        db.all(sql, params, done<Interval[]>(resolve, reject));
    });
}