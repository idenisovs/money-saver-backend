var dal = require('../../dal');

module.exports = getLatestInterval;

function getLatestInterval(interval, success, error)
{
	dal.intervals.getLatest(interval, onDone);

	function onDone(err, result)
	{
		if (err)
		{
			return error(err);
		}

		success(result);
	}
}