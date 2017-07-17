/**
* Payments REST API endpoint
*/
const validatePayments = require('./validate-payment');

const router = require('express').Router();

router.get('/', require('./get-payments'));

router.post('/', validatePayments, require('./save-payments'));

router.put('/', validatePayments, require('./update-payments'));

router.delete('/', require('./delete-payment'));

router.delete('/:id', require('./delete-payment'));

module.exports = router;

require('log4js').getLogger('api').debug('Payments module is up!');