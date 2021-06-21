import { RunResult } from 'sqlite3';
import db from '../db';
import { Payment, User } from '../../shared';

const sql = 'DELETE FROM payments WHERE id = $id AND userId = $userId';

export function deleteById(payment: Payment, user: User): Promise<number> {
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