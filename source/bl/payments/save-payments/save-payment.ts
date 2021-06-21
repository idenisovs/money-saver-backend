import log4js from 'log4js';
import setFields from './set-payment-fields';
import { Payment, User } from '../../../shared';
import dal from '../../../dal';

const log = log4js.getLogger('save-payments');

export default function savePayment(payment: Payment, user: User): Promise<void> {
	setFields(payment);

	log.trace(payment);

	return dal.payments.save(payment, user);
}