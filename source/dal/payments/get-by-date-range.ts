import { Payment, User } from '../../shared';
import done from '../done';
import db from '../db';
import { PaymentRecord } from './payment-record';
import paymentMapper from './payment-mapper';

let sql = '';

sql += 'SELECT id, date, sum\n';
sql += 'FROM payments\n';
sql += 'WHERE date BETWEEN $from AND $till AND userId = $userId\n';
sql += 'ORDER BY date ASC, createdAt ASC';

type DataRange = {
	from: string,
	till: string
};

export function getByDateRange(range: DataRange, user: User): Promise<Payment[]> {
	return new Promise((resolve, reject) => {
		const params = {
			$from: range.from,
			$till: range.till,
			$userId: user.id,
		};

		db.all(sql, params, done<PaymentRecord, Payment>(resolve, reject, paymentMapper));
	});
}
