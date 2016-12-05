/**
 * Created by I.Denisovs on 04.12.2016
 */

var bcrypt = require('bcrypt-nodejs');
var log = require('log4js').getLogger('properties');
var dal = require('../../../dal');
var validatePassword = require('./validate-password');

function saveProperties(request, success, error) {
    log.trace(request);

    var password = request.properties.password;

    if (password) {
        var validator = validatePassword(password, updateHash, error);
        bcrypt.compare(password.original, request.user.password, validator);
        return;
    }

    updateHash(null, request.user.password);

    function updateHash(err, hash) {
        if (err) {
            return error(err);
        }

        request.properties.password = {
            hash: hash
        };

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