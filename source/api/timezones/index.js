/**
 * Created by Ilya Denisov on 25.06.2016..
 */

var router = require('express').Router();

router.get('/', require('./get-all'));

router.get('/:id', require('./get-by-id'));

module.exports = router;

require('log4js').getLogger('api').debug('Timezones module is up!');