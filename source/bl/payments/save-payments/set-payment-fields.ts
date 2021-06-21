import moment from 'moment';
import { Payment } from '../../../shared';

export default function setFields(payment: Payment) {
	const timeUndefined = typeof payment.time === 'undefined';
	const dateUndefined = typeof payment.date === 'undefined'

	if (timeUndefined && dateUndefined) {
		payment.time = Date.now();
		payment.date = moment(payment.time).format('YYYY-MM-DD');
		return;
	}

	if (!dateUndefined) {
		payment.date = moment(payment.date).format('YYYY-MM-DD');
	}

	if (timeUndefined && !dateUndefined) {
		payment.time = moment(payment.date).valueOf();
		return;
	}

	if (!timeUndefined && dateUndefined) {
		payment.date = moment(payment.time).format('YYYY-MM-DD');
	}
}