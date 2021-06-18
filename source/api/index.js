const router = require('express').Router();
const auth = require('../support/middleware/auth-middleware');
const log = require('log4js').getLogger('api');

router.use('/payments', auth, require('./payments'));

router.use('/intervals', auth, require('./intervals').default);

router.use('/auth', require('./auth'));

router.use('/health', require('./health'));

router.use('/version', require('./version'));

router.use('/summary', auth, require('./summary'));

router.use('/properties', auth, require('./properties'));

router.use('/timezones', require('./timezones'));

router.use('/users', require('./users'));

module.exports = router;

log.debug('API module is up!');
