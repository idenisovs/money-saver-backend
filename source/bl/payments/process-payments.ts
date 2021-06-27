import log4js from 'log4js';
import { Payment, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('process-payments');

export async function processPayments(payments: Payment[], user: User): Promise<void> {
	log.debug('Processing <%d> payments from user <%d>!', payments.length, user.id);

	const updateList = payments.filter((p) => p.add || p.update || p.remove || !('id' in p));

	log.debug('Carrying out <%d> payments from list of <%d> and user <%d>!', updateList.length, payments.length, user.id);

	for (let payment of updateList) {
		if (payment.add || !('id' in payment)) {
			await dal.payments.create(payment, user);
		} else if (payment.remove) {
			await dal.payments.remove(payment, user);
		} else {
			await dal.payments.update(payment, user);
		}
	}
}