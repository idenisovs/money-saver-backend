var moment = require('moment');
var dal = require('../../dal');

module.exports = getIntervalById;

function getIntervalById(interval, success, error)
{
	dal.intervals.getById(interval, onDone);

	function onDone(err, result)
	{
		if (err)
		{
			error(err);
			return;
		}

		if(!result)
		{
			error('No interval with such id: ' + id + '!');
			return;
		}

		success(result);
	}
}