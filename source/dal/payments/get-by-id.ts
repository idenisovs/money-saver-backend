import db from '../db';
import done from '../done';
import { Payment, User } from '../../shared';
import { PaymentRecord } from './payment-record';
import paymentMapper from './payment-mapper';

let sql = '';

sql += 'SELECT id, time, sum\n';
sql += 'FROM payments\n';
sql += 'WHERE id = $id\n';
sql += 'AND userId = $userId\n';

export function getById(paymentId: number, user: User): Promise<Payment> {
    return new Promise((resolve, reject) => {
        const params = {
            '$id': paymentId,
            '$userId': user.id
        };

        db.get(sql, params, done<PaymentRecord, Payment>(resolve, reject, paymentMapper));
    });
}
