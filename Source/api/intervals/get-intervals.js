/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('http-status');
var log = require('log4js').getLogger('get-intervals');
var bl = require('../../bl/bl');

function getIntervals(req, res)
{
    var time = req.query.timestamp ? req.query.timestamp : null;

    if (time)
    {
		log.debug('Taking interval by time: %s', time);
        var interval = { time: time, user: req.user };
        bl.intervals.getByTime(interval, success, error);
		return;
    }
	
	var from = req.query.from ? req.query.from : null;
	var till = req.query.till ? req.query.till : null;
	
    if (from || till)
    {
        log.debug('Taking interval by boundary: from %s to %s', from, till);
        var interval = { from: from, till: till, user: req.user };
        bl.intervals.getByBoundary(interval, success, error);
		return;
    }
	
	log.debug('No query params defined, returning latest interval...');
	log.warn('This call shall return the list of intervals instead of latest interval!');

    var interval = { user: req.user };

	bl.intervals.getLatest(interval, success, error);

    function success(result)
    {
        log.trace(result);
        res.json(result);
    }

    function error(err)
    {
		log.error(err);
        res.status(states.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}

module.exports = getIntervals;