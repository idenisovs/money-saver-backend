/**
 * This API allow to request the properties of user!
 *
 * Created by I.Denisovs on 03.12.2016
 */

var log = require('log4js').getLogger('properties');
var http = require('http-status');
var bl = require('../../bl');

function getProperties(req, res) {
    
    var user = req.user;

    log.debug('Retreiving properties for user %s (%d).', user.login, user.id);

    bl.properties.get(user, success, error);

    function success(properties) {
        log.debug('Success for user %s (%d)!', user.login, user.id);
        res.json(properties);
    }

    function error(err) {
        log.error(err);
        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = getProperties;