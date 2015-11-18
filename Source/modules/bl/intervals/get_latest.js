var moment = require('moment');
var dal = require('../../dal/dal');

module.exports = getLatestInterval;

function getLatestInterval(success, error)
{
	var interval;
	
	dal.intervals.getLatest(takeInterval, error);
	
	function takeInterval(_interval)
	{
		interval = _interval;
		
		dal.payments.byIntervalId(interval.id, takePayments, error);
	}
	
	function takePayments(payments)
	{
		interval.payments = payments;
		
		console.info(interval);
		
		var startDate = moment(interval.start);
		console.info(startDate.toString());
		
		var endingDate = moment(interval.end);
		console.info(endingDate.toString());
		
		var daysDiff = endingDate.diff(startDate, 'days');
		console.info('Days covered by interval: %d', daysDiff);
		
		success(interval);
	}
}