const timezones = require('./timezones');

function getById(id, done) {
	for (let i = 0; i < timezones.length; i++) {
		if (timezones[i].timeZoneId === parseInt(id)) {
			return done(null, timezones[i]);
		}
	}
	
	return done({ error: 'TIMEZONE_NOT_FOUND' });
}

module.exports = getById;

