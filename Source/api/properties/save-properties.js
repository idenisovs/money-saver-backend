/**
 * Created by I.Denisovs on 04.12.2016
 */

var log = require('log4js').getLogger('properties');
var http = require('http-status');
var bl = require('../../bl');

function saveProperties(req, res) {

    var user = req.user;

    var request = {
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
        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = saveProperties;