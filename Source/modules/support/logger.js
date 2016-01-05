var log4js = require('log4js');

var logger = log4js.getLogger('log');

function getLogger(category)
{
	if (!category)
	{
		category = 'default';
	}
	
	return log4js.getLogger(category);
}

module.exports = { get: getLogger };