var router = require('express').Router();
var auth = require('./auth-middleware');

router.use('/payments', auth, require('./payments/payments'));

router.use('/intervals', auth, require('./intervals/intervals'));

router.use('/health', require('./health/health'));

router.use('/auth', require('./auth/auth'));

module.exports = router;

require('log4js').getLogger('api').info('API is up!');
