const log = require('log4js').getLogger('properties');
const http = require('http-status');
const bl = require('../../bl');

function saveProperties(req, res) {

    const user = req.user;

    const request = {
        properties: req.body,
        user: user
    };

    log.debug('Saving properties for user %s (%d).', user.login, user.id);

    bl.properties.save(request, success, error);

    function success(properties) {

        req.user.password = properties.password.hash;
        req.user.email = properties.email;
        req.user.timezone = properties.timezone;
        req.user.language = properties.language;

        log.debug('Success for user %s (%d)!', user.login, user.id);

        res.json();
    }

    function error(err) {
        log.error(err);
		
		if (err.error && err.error.match(/^PROPERTIES_/)) {
			res.status(http.BAD_REQUEST).json(err);
		} else {
			res.status(http.INTERNAL_SERVER_ERROR).json(err);
		}
        
    }
}

module.exports = saveProperties;