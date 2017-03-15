/**
 * This API should process requests regarding to the users list.
 *
 * Created by I.Denisovs on 14.03.2017.
 */

var router = require('express').Router();

router.get('/active', require('./get-active-count'));

module.exports = router;