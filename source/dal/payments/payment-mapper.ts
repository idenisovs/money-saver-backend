import { PaymentRecord } from './payment-record';
import { Payment } from '../../shared';

export default function paymentMapper(record: PaymentRecord): Payment {
	return new Payment({
		...record
	});
}
