var moment = require('moment');
var log = require('log4js').getLogger('get-by-boundary');
var dal = require('../../dal');

module.exports = getIntervalByBoundary;

function getIntervalByBoundary(interval, success, error)
{
	var from = interval.from;

	interval.from = (from === null) ? 0 : moment(from).valueOf();

	var till = interval.till;

	interval.till = (till === null) ? Date.now() : moment(till).valueOf();
	
	log.debug('Taking all intervals from %d till %d', interval.from ,interval.till);
	log.trace(interval);
	
	dal.intervals.getByBoundary(interval, done);
	
	function done(err, intervals)
	{
		if (err)
		{
			log.error(err);
			error(err);
			return;
		}
		
		success(intervals);
	}
}