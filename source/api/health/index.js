/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var router = require('express').Router();

router.get('/', require('./get-health'));

module.exports = router;

