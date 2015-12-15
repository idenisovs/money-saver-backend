var moment = require('moment');
var dal = require('../../dal/dal');

module.exports = getIntervalById;

function getIntervalById(id, success, error)
{
	dal.intervals.getById(id, onDone);

	function onDone(err, interval)
	{
		if (err)
		{
			error(err);
			return;
		}

		if(!interval)
		{
			error('No interval with such id: ' + id + '!');
			return;
		}

		success(interval);
	}
}