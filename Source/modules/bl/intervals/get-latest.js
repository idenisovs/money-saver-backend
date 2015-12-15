var moment = require('moment');
var dal = require('../../dal/dal');

module.exports = getLatestInterval;

function getLatestInterval(success, error)
{
	dal.intervals.getLatest(success, error);
}