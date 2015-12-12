/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var router = require('express').Router();
var states = require('../../util/http.states.js');

router.get('/', require('./get-intervals'));

router.post('/', require('./create-interval'));

router.get('/latest', require('./get-latest-interval'));

router.get('/:id', require('./get-interval-by-id'));

module.exports = router;