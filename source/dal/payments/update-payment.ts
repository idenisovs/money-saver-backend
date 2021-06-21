import db from '../db';
import { Payment, User } from '../../shared';
import done from '../done';

const sql = 'UPDATE payments SET sum = $sum WHERE id = $id AND userId = $userId';

export function updatePayment(payment: Payment, user: User): Promise<void> {
    return new Promise((resolve, reject) => {
        const params = {
            $id: payment.id,
            $sum: payment.sum,
            $userId: user.id
        };

        db.run(sql, params, done<void>(resolve, reject));
    });
}