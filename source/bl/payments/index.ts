import { getPayments as get } from './get-payments';
import { deletePayments as remove } from './delete-payments';
import { savePayments as save } from './save-payments';

const payments = {
	get,
	save,
	remove,
	update: require('./update-payments')
};

export default payments;