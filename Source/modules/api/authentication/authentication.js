/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var router = require('express').Router();

router.post('/', require('./process-login'));

module.exports = router;

require('log4js').getLogger('auth').debug('Authentication module is up!');