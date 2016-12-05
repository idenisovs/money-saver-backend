/**
 * Created by I.Denisovs on 04.12.2016
 */

var bcrypt = require('bcrypt-nodejs');
var argv = require('yargs').argv;
var log = require('log4js').getLogger('properties');
var dal = require('../../dal');

function saveProperties(request, success, error) {
    log.trace(request);

	var password = request.properties.password;

	if (password) {
		return bcrypt.compare(password.original, request.user.password, validatePassword);
	}

	request.properties.password = {};

	password = request.properties.password;

    updateHash(null, request.user.password);

    function validatePassword(err, valid) {
		
		if (err) {
			return error(err);
		}
		
		if (!valid) {
			return error({ error: 'PROPERTIES_INVALID_PASSWORD' });
		}

        if (argv.testable && password.created === 'demo1') {
			return bcrypt.hash(password.created, null, null, updateHash);
		}
		
		if (password.created !== password.confirm) {
			return error({ error: 'PROPERTIES_PASSWORD_NOT_MATCH' });
		}
		
		if (password.created.length < 8) {
			return error({ error: 'PROPERTIES_PASSWORD_TOO_SHORT' });
		}
		
		if (!password.created.match(/[A-Z]/)) {
			return error({ error: 'PROPERTIES_PASSWORD_LETTER' });
		}
		
		if (!password.created.match(/\d/)) {
			return error({ error: 'PROPERTIES_PASSWORD_NUMBER' });
		}
		
		bcrypt.hash(password.created, null, null, updateHash);
	}
	
	function updateHash(err, hash) {
		if (err) {
			return error(err);
		}

		password.hash = hash;

		dal.properties.save(request, done);
	}

    function done(err) {
        if (err) {
            return error(err);
        }

        success(request.properties);
    }
}

module.exports = saveProperties;