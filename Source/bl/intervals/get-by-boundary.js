var moment = require('moment');
var log = require('log4js').getLogger('get-by-boundary');
var dal = require('../../dal/dal');

module.exports = getIntervalByBoundary;

function getIntervalByBoundary(from, till, user, success, error)
{
	from = (from === null) ? 0 : moment(from).valueOf();
	
	till = (till === null) ? Date.now() : moment(till).valueOf();
	
	log.debug('Taking all intervals from %d till %d', from ,till);
	
	dal.intervals.getByBoundary(from, till, user.id, done);
	
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