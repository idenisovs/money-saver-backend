import log4js from 'log4js';
import db from '../db';
import { getByTime } from '../intervals';
import { Payment, User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('save-payment');

const sql = 'INSERT INTO payments (time, date, sum, userId) VALUES ($time, $date, $sum, $userId)';

export function savePayment(payment: Payment, user: User): Promise<void> {
    log.debug('Saving payment <%d> with sum <%d> from user <%d>!', payment.id, payment.sum, user.id);
    log.trace(payment);

    return new Promise(async (resolve, reject) => {
        const params = {
            $time: payment.time,
            $date: payment.date,
            $sum: payment.sum,
            $userId: user.id
        };

        const intervalQuery = {
            time: (payment.time as Date).getTime()
        };

        const result = await getByTime(intervalQuery, user);

        if (result) {
            return db.run(sql, params, done<void>(resolve, reject));
        }

        let message = '';
        message += 'Given payment does not belong to any of intervals!\n';
        message += 'Please, set the correct value to Time field!';

        reject(new Error(message));
    });
}
