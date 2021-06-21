import { Payment, User } from '../../shared';
import done from '../done';
import db from '../db';

let sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE date = $date AND userId = $userId\n";
sql += "ORDER BY time ASC\n";

export function getByDate(date: string, user: User): Promise<Payment[]> {
    return new Promise((resolve, reject) => {
        const params = {
            '$date': date,
            '$userId': user.id
        };

        db.all(sql, params, done<Payment[]>(resolve, reject));
    })
}