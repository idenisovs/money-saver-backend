/**
 * Get properties of specified user.
 *
 * Created by I.Denisovs on 03.12.2016
 */

var log = require('log4js').getLogger('properties');
var dal = require('../../dal');

function getProperties(user, success, error) {

    log.trace(user);

    dal.users.getById(user.id, done);

    function done(err, properties) {
        if (err) {
            return error(err);
        }

        delete properties.password;

        log.trace(properties);

        success(properties);
    }
}

module.exports = getProperties;