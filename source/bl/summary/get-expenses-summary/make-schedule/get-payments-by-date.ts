import { Payment } from '../../../../shared';
import { DAY } from '../../../../support/constants';

export default function getPaymentsByDate(payments: Payment[], date: Date): Payment[] {
	const startOfDay = date.getTime();
	const endOfDay = startOfDay + DAY - 1;

	return payments.filter((payment) => {
		const timeOfPayment = payment.time.getTime();
		return timeOfPayment >= startOfDay && timeOfPayment <= endOfDay;
	});
}
