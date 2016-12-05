/**
 * Created by I.Denisovs on 04.12.2016
 */

var bcrypt = require('bcrypt-nodejs');
var log = require('log4js').getLogger('properties');
var dal = require('../../dal');

function saveProperties(request, success, error) {
    log.trace(request);
	
	var password = request.properties.password;

	if (password) {
		bcrypt.compare(password.original, request.user.password, validatePassword);
	} else {
		updateHash(null, request.user.password);
	}

    function validatePassword(err, valid) {
		
		if (err) {
			return error(err);
		}
		
		if (!valid) {
			return error({ error: 'Existing password is not valid! Please, authorize yourself first!' });
		}
		
		if (password.created !== password.confirm) {
			return error({ error: 'Passwords not match!' });
		}
		
		if (password.created.length < 8) {
			return error({ error: 'New password is too short. Min 8 symbols required!' });
		}
		
		if (!password.created.match(/[A-Z]/)) {
			return error({ error: 'New password shall contain at least one uppercase letter!' });
		}
		
		if (!password.created.match(/\d/)) {
			return error({ error: 'New password shall contain at least one number!' });
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

        success();
    }
}

module.exports = saveProperties;