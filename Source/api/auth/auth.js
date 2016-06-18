/**
 * Created by I.Denisovs on 16.17.5.
 */

var router = require('express').Router();
var auth = require('../../middleware/auth-middleware');

router.post('/', require('./local'));
router.get('/logout', auth, require('./logout'));
router.get('/success', require('./success'));
router.get('/failure', require('./failure'));

module.exports = router;

require('log4js').getLogger('api').debug('Auth module is up!');