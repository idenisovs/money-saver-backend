/**
 * Get properties of specified user.
 *
 * Created by I.Denisovs on 03.12.2016
 */

var log = require('log4js').getLogger('properties');
var dal = require('../../dal');

function getProperties(user, success, error) {

    log.trace(user);

    var result;

    dal.users.getById(user.id, getUserTimezone);

    function getUserTimezone(err, properties) {
        if (err) {
            return error(err);
        }

        result = properties;

        dal.timezones.getById(properties.timezone, done);
    }

    function done(err, timezone) {
        if (err) {
            return error(err);
        }

        result.timezone = timezone;

        delete result.password;

        log.trace(result);

        success(result);
    }
}

module.exports = getProperties;