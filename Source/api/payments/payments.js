/**
  * Payments REST API endpoint
  */
var router = require('express').Router();

router.get('/', require('./get-payments'));

router.post('/', require('./save-payments'));

router.delete('/', require('./delete-payment'));

router.delete('/:id', require('./delete-payment'));

module.exports = router;

require('log4js').getLogger('api').debug('Payments module is up!');