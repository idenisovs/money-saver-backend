/**
 * Intervals REST API endpoint
 * Sample call: http://localhost:9001/api/intervals
 */
const states = require('http-status');
const log = require('log4js').getLogger('get-intervals');
const bl = require('../../bl');

function getIntervals(req, res)
{
    const time = req.query.timestamp ? req.query.timestamp : null;

    if (time)
    {
		log.debug('Taking interval by time: %s', time);
        let interval = { time: time, user: req.user };
        bl.intervals.getByTime(interval, success, error);
		return;
    }

    const from = req.query.from ? req.query.from : null;
    const till = req.query.till ? req.query.till : null;

    if (from || till)
    {
        log.debug('Taking interval by boundary: from %s to %s', from, till);
        let interval = { from: from, till: till, user: req.user };
        bl.intervals.getByBoundary(interval, success, error);
		return;
    }
	
	log.debug('No query params defined, returning list of all intervals...');

    bl.intervals.getAll(req.user, success, error);

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
