/**
 * primary by I.Denisovs on 05.12.2016
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

        if (argv.testable && password.primary === 'demo1') {
            return bcrypt.hash(password.primary, null, null, updateHash);
        }

        if (password.primary !== password.confirm) {
            return error({ error: 'PROPERTIES_PASSWORD_NOT_MATCH' });
        }

        if (password.primary.length < 8) {
            return error({ error: 'PROPERTIES_PASSWORD_TOO_SHORT' });
        }

        if (!password.primary.match(/[A-Z]/)) {
            return error({ error: 'PROPERTIES_PASSWORD_LETTER' });
        }

        if (!password.primary.match(/\d/)) {
            return error({ error: 'PROPERTIES_PASSWORD_NUMBER' });
        }

        bcrypt.hash(password.primary, null, null, updateHash);
    }
}

module.exports = validatePassword;