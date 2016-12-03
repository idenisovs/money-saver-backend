/**
 * Created by I.Denisovs on 03.12.2016
 */

var router = require('express').Router();

router.get('/', require('./get-properties'));

module.exports = router;

require('log4js').getLogger('api').debug('Properties module is up!');