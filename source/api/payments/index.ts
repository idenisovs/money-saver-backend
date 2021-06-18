import Router from 'express';
import validatePayments from './validate-payment';
import getPayments from './get-payments';

const payments = Router();

payments.get('/', getPayments);

payments.post('/', validatePayments, require('./save-payments'));

payments.put('/', validatePayments, require('./update-payments'));

payments.delete('/', require('./delete-payment'));

payments.delete('/:id', require('./delete-payment'));

module.exports = payments;

require('log4js').getLogger('api').debug('Payments module is up!');