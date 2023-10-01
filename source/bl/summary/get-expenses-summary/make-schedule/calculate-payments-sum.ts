import { Payment } from '../../../../shared';

export default function calculatePaymentsSum(payments: Payment[]): number {
	return payments.reduce((result, item) => result + item.sum, 0);
}
