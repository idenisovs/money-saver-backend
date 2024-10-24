import { Payment } from '../../../../shared';

export default function getPaymentsByDate(payments: Payment[], date: string): Payment[] {
	return payments.filter((payment) => {
		return payment.date === date;
	});
}
