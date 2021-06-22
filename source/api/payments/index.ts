import Router from 'express';
import validatePayments from './validate-payment';
import getPayments from './get-payments';
import savePayments from './save-payments';
import updatePayments from './update-payments';
import deletePayment from './delete-payment';

const payments = Router();

payments.get('/', getPayments);
payments.post('/', validatePayments, savePayments);
payments.put('/', validatePayments, updatePayments);
payments.delete('/', deletePayment);
payments.delete('/:id', deletePayment);

export default payments;