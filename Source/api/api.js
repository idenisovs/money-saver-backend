var router = require('express').Router();
var auth = require('../support/middleware/auth-middleware');

router.use('/payments', auth, require('./payments/payments'));

router.use('/intervals', auth, require('./intervals/intervals'));

router.use('/auth', require('./auth/auth'));

router.use('/health', require('./health/health'));

router.use('/version', require('./version/version'));

router.use('/summary', auth, require('./summary/summary'));

module.exports = router;

require('log4js').getLogger('api').debug('API module is up!');
