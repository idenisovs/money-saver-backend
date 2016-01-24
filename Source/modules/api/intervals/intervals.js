/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var router = require('express').Router();

router.get('/', require('./get-intervals'));
router.post('/', require('./create-interval'));
router.get('/latest', require('./get-latest-interval'));
router.get('/latest/summary', require('./get-latest-interval-summary'));
router.get('/:id', require('./get-interval-by-id'));
router.delete('/:id', require('./delete-interval'));
router.get('/:id/payments', require('./get-payments-by-interval'));

module.exports = router;

require('log4js').getLogger('api').debug('Intervals module is up!');