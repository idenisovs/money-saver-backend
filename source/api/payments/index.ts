import Router from 'express';
import validatePayments from './validate-payment';
import getPayments from './get-payments';
import processPayments from './process-payments';

const payments = Router();

payments.get('/', getPayments);
payments.post('/', validatePayments, processPayments);

export default payments;
