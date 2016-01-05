var log = require('../support/logger').get('api');

var router = require('express').Router();

router.use('/payments', require('./payments/payments'));

router.use('/intervals', require('./intervals/intervals'));

module.exports = router;

log.info('API is up!');
