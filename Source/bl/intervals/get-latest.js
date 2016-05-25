var dal = require('../../dal/dal');

module.exports = getLatestInterval;

function getLatestInterval(user, success, error)
{
	dal.intervals.getLatest(user.id, onDone);

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