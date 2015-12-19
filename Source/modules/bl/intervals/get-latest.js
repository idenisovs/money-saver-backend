var dal = require('../../dal/dal');

module.exports = getLatestInterval;

function getLatestInterval(success, error)
{
	dal.intervals.getLatest(onDone);

	function onDone(err, interval)
	{
		if (err)
		{
			error(err);
			return;
		}

		success(interval);
	}
}