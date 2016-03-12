var router = require('express').Router();

router.use('/payments', require('./payments/payments'));

router.use('/intervals', require('./intervals/intervals'));

router.use('/health', require('./health/health'));

module.exports = router;

require('log4js').getLogger('api').info('API is up!');
