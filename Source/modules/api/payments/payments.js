/**
  * Payments REST API endpoint
  */
var log = require('../../support/logger').get('api');
var router = require('express').Router();

router.get('/', require('./get-payments'));

router.post('/', require('./save-payments'));

router.delete('/', require('./delete'));

router.delete('/:id', require('./delete'));

module.exports = router;

log.debug('Payments module is up!');