import log4js from 'log4js';
import db from '../db';
import { Payment, User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('update-payment');

const sql = 'UPDATE payments SET sum = $sum WHERE id = $id AND userId = $userId';

export function updatePayment(payment: Payment, user: User): Promise<void> {
    log.debug('Updating payment <%d> with sum <%d> from user <%d>!', payment.id, payment.sum, user.id);
    log.trace(payment);

    return new Promise((resolve, reject) => {
        const params = {
            $id: payment.id,
            $sum: payment.sum,
            $userId: user.id
        };

        db.run(sql, params, done<void>(resolve, reject));
    });
}