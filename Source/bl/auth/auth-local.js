/**
 * Created by I.Denisovs on 16.17.5.
 */

var bcrypt = require('bcrypt-nodejs');
var log = require('log4js').getLogger('auth');
var dal = require('../../dal');

module.exports = auth;

function auth(username, password, done)
{
    var user = null;

    log.debug('Authorization of user %s...', username);

    dal.users.getByName(username, validateUsername);

    function validateUsername(error, userRecord)
    {
        if (error)
        {
            return fail(error);
        }

        if (!userRecord)
        {
            return reject();
        }

        user = userRecord;

        bcrypt.compare(password, user.password, validatePassword);
    }

    function validatePassword(error, passValid)
    {
        if (error)
        {
            return fail(error);
        }

        if (!passValid)
        {
            return reject();
        }

        log.info('%s successfully authenticated!', username);

        done(null, user)
    }

    function reject()
    {
        log.warn('Rejecting user %s with password %s!', username, password);
        done(null, false, { message: 'Incorrect login or password!' });
    }

    function fail(error)
    {
        log.error(error);
        done(error);
    }
}