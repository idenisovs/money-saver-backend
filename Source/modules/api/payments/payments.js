/**
  * Payments REST API endpoint
  */

var router = require('express').Router();

router.get('/', require('./get-payments'));

router.post('/', require('./save-payments'));

module.exports = router;