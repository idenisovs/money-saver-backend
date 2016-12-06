var timezones = require('./timezones.json');

function getById(id, done) {
	for (var i = 0; i < timezones.length; i++) {
		if (timezones[i].timeZoneId === id) {
			return done(null, timezones[i]);
		}
	}
	
	return done({ error: 'TIMEZONE_NOT_FOUND' });
}

module.exports = getById;

