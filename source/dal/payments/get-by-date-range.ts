import { Payment, User } from '../../shared';
import done from '../done';
import db from '../db';
import { PaymentRecord } from './payment-record';
import paymentMapper from './payment-mapper';

let sql = '';

sql += 'SELECT id, time, sum\n';
sql += 'FROM payments\n';
sql += 'WHERE time BETWEEN $from AND $till AND userId = $userId\n';
sql += 'ORDER BY time ASC';

type DataRange = {
	from: Date,
	till: Date
};

export function getByDateRange(range: DataRange, user: User): Promise<Payment[]> {
	return new Promise((resolve, reject) => {
		const params = {
			$from: range.from.toISOString(),
			$till: range.till.toISOString(),
			$userId: user.id,
		};

		db.all(sql, params, done<PaymentRecord, Payment>(resolve, reject, paymentMapper));
	});
}
