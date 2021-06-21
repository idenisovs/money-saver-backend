import { Payment, User } from '../../../shared';
import savePayment from './save-payment';

export async function savePayments(payments: Payment|Payment[], user: User): Promise<void> {
	if (!Array.isArray(payments)) {
		payments = [ payments ];
	}

	for (let payment of payments) {
		await savePayment(payment, user);
	}
}