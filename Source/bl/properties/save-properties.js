/**
 * Created by I.Denisovs on 04.12.2016
 */

var bcrypt = require('bcrypt-nodejs');
var log = require('log4js').getLogger('properties');
var dal = require('../../dal');

function saveProperties(request, success, error) {
    log.trace(request);

    if (request.properties.password) {
        bcrypt.hash(request.properties.password, null, null, save);
    } else {
        save(null, request.user.password);
    }

    function save(err, hash) {
        if (err) {
            return error(err);
        }

        request.properties.hash = hash;

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