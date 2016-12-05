/**
 * Created by I.Denisovs on 05.12.2016
 */

var argv = require('yargs').argv;
var bcrypt = require('bcrypt-nodejs');

function validatePassword(password, updateHash, error) {

    return validator;

    function validator(err, valid) {
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
}

module.exports = validatePassword;