/**
  * Payments REST API endpoint
  */

var router = require('express').Router();

router.get('/', require('./get-payments'));

router.post('/', require('./save-payments'));

router.delete('/', require('./delete'));

router.delete('/:id', require('./delete'));

module.exports = router;