import log4js from 'log4js';
import { Payment, PaymentsSaveResult, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('save-payments');

export async function savePayments(payments: Payment[], user: User): Promise<PaymentsSaveResult> {
	log.debug('Saving <%d> payments from user <%d>!', payments.length, user.id);

	const result: PaymentsSaveResult = {
		saved: 0,
		failed: 0
	};

	for (let payment of payments) {
		try {
			await dal.payments.save(payment, user);
			result.saved++;
		} catch (e) {
			log.error(e);
			result.failed++;
		}
	}

	log.debug('Saved <%d> payments, failed <%d>!', result.saved, result.failed);

	return result;
}