/**
 * Created by Ilya Denisov on 06.12.2016..
 */
 
var statusCodes = require('http-status');
var log = require('log4js').getLogger('timezones');
var dal = require('../../dal');

function getAll(req, res)
{
    log.debug('get all');
	
	res.json(dal.timezones.getAll());
}

module.exports = getAll;
