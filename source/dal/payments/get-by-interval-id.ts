import db from '../db';
import done from '../done';
import { Payment, User } from '../../shared';
import { PaymentRecord } from './payment-record';
import paymentMapper from './payment-mapper';

let sql = '';

sql += 'SELECT date(p.time) AS date, sum(p.sum) AS sum\n';
sql += 'FROM intervals i\n';
sql += 'LEFT OUTER JOIN payments p ON p.time > i.start AND p.time < i.end\n';
sql += 'WHERE i.id = $id AND p.userId = $userId\n';
sql += 'GROUP BY date';

export function getByIntervalId(intervalId: number, user: User): Promise<Payment[]> {
	return new Promise((resolve, reject) => {
		const params = {
			$id: intervalId,
			$userId: user.id,
		};

		db.all(sql, params, done<PaymentRecord, Payment>(resolve, reject, paymentMapper));
	});
}
