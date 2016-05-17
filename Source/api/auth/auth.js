/**
 * Created by I.Denisovs on 16.17.5.
 */

var router = require('express').Router();

router.post('/', require('./authenticate'));

module.exports = router;