import log4js from 'log4js';
import db from '../db';
import { Payment, User } from '../../shared';
import done from '../done';

const log = log4js.getLogger('create-payment');

const sql = 'INSERT INTO payments (date, sum, userId) VALUES ($date, $sum, $userId)';

export function createPayment(payment: Payment, user: User): Promise<void> {
	log.debug('Creating payment record with sum <%d> and user <%d>!', payment.sum, user.id);
	log.trace(payment);

	return new Promise((resolve, reject) => {
		const params = {
			$date: payment.date,
			$sum: payment.sum,
			$userId: user.id,
		};

		return db.run(sql, params, done(resolve, reject));
	});
}
