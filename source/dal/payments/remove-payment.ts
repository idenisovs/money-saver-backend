import { RunResult } from 'sqlite3';
import log4js from 'log4js';
import db from '../db';
import { Payment, User } from '../../shared';

const log = log4js.getLogger('delete-payment');

const sql = 'DELETE FROM payments WHERE id = $id AND userId = $userId';

export function removePayment(payment: Payment, user: User): Promise<number> {
    log.debug('Removing payment <%d> from user <%d>!', payment.id, user.id);

    return new Promise((resolve, reject) => {
        const params = {
            $id: payment.id,
            $userId: user.id
        };

        db.run(sql, params, done);

        function done(this: RunResult, err: Error) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes)
            }
        }
    });
}