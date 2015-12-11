/**
  * Payments REST API endpoint
  */

var router = require('express').Router();

router.get('/', require('./get-latest-payment'));

router.get('/:date', require('./get-payment-by-date'));

router.post('/', require('./save-payment'));

module.exports = router;
