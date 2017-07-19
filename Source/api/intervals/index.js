/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

const router = require('express').Router();
const validate = require('./validate-interval');

router.get('/', require('./get-intervals'));
router.post('/', validate, require('./create-interval'));
router.get('/latest', require('./get-latest-interval'));
router.get('/latest/summary', require('./get-latest-interval-summary'));
router.get('/years', require('./get-years'));
router.get('/:id', require('./get-interval-by-id'));
router.put('/:id', validate, require('./update-interval'));
router.delete('/:id', require('./delete-interval'));
router.get('/:id/payments', require('./get-payments-by-interval'));

module.exports = router;

require('log4js').getLogger('api').debug('Intervals module is up!');