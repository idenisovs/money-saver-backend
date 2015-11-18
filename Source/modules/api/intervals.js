/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var router = require('express').Router();
var bl = require('../bl/bl');
var states = require('../util/http.states');

router.get('/', getLatestInterval);

module.exports = router;

function getLatestInterval(req, res)
{
	bl.intervals.latest(success, error);
	
	function success(interval)
	{
		res.json(interval);
	}
	
	function error(err)
	{
		res.status(states.InternalError).json(err);
	}
}