/**
  * Payments REST API endpoint
  */

var router = require('express').Router();

router.get('/', require('./get-payments'));

module.exports = router;