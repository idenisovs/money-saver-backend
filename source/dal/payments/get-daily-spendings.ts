import db from '../db';
import { Interval, Spending } from '../../shared';

let sql = "";

sql += "SELECT p.date, sum(p.sum) AS sum\n";
sql += "FROM intervals i\n";
sql += "LEFT OUTER JOIN payments p ON p.time > i.start AND p.time <= i.end\n";
sql += "WHERE i.id = $id AND p.userId = $userId\n";
sql += "GROUP BY date\n";

export default function getDailySpendings(interval: Interval): Promise<Spending[]> {
    return new Promise((resolve, reject) => {
        const params = {
            '$id': interval.id,
            '$userId': interval.user.id
        };

        db.all(sql, params, (err: Error, result: Spending[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

}