import { Payment, User } from '../../shared';
import db from '../db';
import done from '../done';
import { PaymentRecord } from './payment-record';
import paymentMapper from './payment-mapper';

let sql = '';

sql += 'SELECT id, date, sum, createdAt\n';
sql += 'FROM payments\n';
sql += 'WHERE date = $date AND userId = $userId\n';
sql += 'ORDER BY date ASC, createdAt ASC\n';

export function getByDate(date: string, user: User): Promise<Payment[]> {
	return new Promise((resolve, reject) => {
		const params = {
			$date: date,
			$userId: user.id,
		};

		db.all(sql, params, done<PaymentRecord, Payment>(resolve, reject, paymentMapper));
	});
}
