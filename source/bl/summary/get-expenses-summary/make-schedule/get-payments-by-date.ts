import { Payment } from '../../../../shared';
import { endOfDay, startOfDay } from '../../../../shared/utils';

export default function getPaymentsByDate(payments: Payment[], date: Date, timezone: string): Payment[] {
	const start = startOfDay(date, timezone).getTime();
	const end = endOfDay(date, timezone).getTime();

	return payments.filter((payment) => {
		const timeOfPayment = payment.time.getTime();
		return start <= timeOfPayment && timeOfPayment <= end;
	});
}
