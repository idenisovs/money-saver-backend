/**
 * Created by I.Denisovs on 04.12.2016
 */

var log = require('log4js').getLogger('properties');
var db = require('../db').default;

var sql = 'UPDATE users ' +
    'SET password = $hash, email = $email, timezone = $timezone, language = $language ' +
    'WHERE id = $id';

function saveProperties(request, done) {

    var params = {
		$id: request.user.id,
        $hash: request.properties.password.hash,
        $email: request.properties.email,
        $timezone: request.properties.timezone.timeZoneId,
        $language: request.properties.language
    };
	
	log.trace(params);

    db.run(sql, params, done);
}

module.exports = saveProperties;