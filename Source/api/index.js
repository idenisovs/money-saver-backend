var router = require('express').Router();
var auth = require('../support/middleware/auth-middleware');

router.use('/payments', auth, require('./payments'));

router.use('/intervals', auth, require('./intervals'));

router.use('/auth', require('./auth'));

router.use('/health', require('./health'));

router.use('/version', require('./version'));

router.use('/summary', auth, require('./summary'));

module.exports = router;

require('log4js').getLogger('api').debug('API module is up!');
