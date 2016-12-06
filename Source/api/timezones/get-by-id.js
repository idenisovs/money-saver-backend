/**
 * Created by Ilya Denisov on 06.12.2016..
 */
 
var http = require('http-status');
var log = require('log4js').getLogger('timezones');
var dal = require('../../dal');

function getAll(req, res)
{
    log.debug('Get by id (%d)', req.params.id);
	
	dal.timezones.getById(req.params.id, done);
	
	function done(err, timezone) {
		if (err) {
			log.error(err);
			res.status(http.BAD_REQUEST).json(err);
			return;
		}
		
		log.debug('Success!');
		log.trace(timezone);
		res.json(timezone);
	}
}

module.exports = getAll;
