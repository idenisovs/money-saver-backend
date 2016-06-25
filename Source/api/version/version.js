/**
 * Created by Ilya Denisov on 25.06.2016..
 */

var router = require('express').Router();

router.get('/', require('./get-version'));

module.exports = router;

require('log4js').getLogger('api').debug('Version module is up!');