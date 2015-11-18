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
		
		dal.payments.getByIntervalId(interval.id, takePayments, error);
	}
	
	function takePayments(payments)
	{
		interval.payments = payments;

		success(interval);
	}
}