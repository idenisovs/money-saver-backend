import { Payment, User } from '../../shared';
import done from '../done';
import db from '../db';

let sql = '';

sql += 'SELECT id, date, time, sum\n';
sql += 'FROM payments\n';
sql += 'WHERE time BETWEEN $from AND $till AND userId = $userId\n';
sql += 'ORDER BY time ASC';

type PaymentQuery = {
    from: number,
    till: number
};

export function getByDateRange(payment: PaymentQuery, user: User): Promise<Payment[]> {
    return new Promise((resolve, reject) => {
        const params = {
            '$from': payment.from,
            '$till': payment.till,
            '$userId': user.id
        };

        db.all(sql, params, done<Payment[]>(resolve, reject));
    });
}

module.exports = getByDateRange;