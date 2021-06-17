const dal = require('../../dal');

module.exports = getLatestInterval;

function getLatestInterval(interval, success, error)
{
	dal.intervals.getLatest(interval, done);

	function done(err, result)
	{
		if (err)
		{
			return error(err);
		}

		success(result);
	}
}