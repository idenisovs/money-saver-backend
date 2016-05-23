/**
 * Created by I.Denisovs on 16.17.5.
 */

var log = require('log4js').getLogger('auth');
var dal = require('../../dal/dal');

function auth(username, password, done)
{
    log.debug('Authorization of user %s...', username);

    dal.users.getByName(username, callback);

    function callback(error, user)
    {
        if (error)
        {
            log.error(error);
            return done(error);
        }

        if (user.login === username && user.password === password)
        {
            log.debug('User %s successfully authorized!', username);
            return done(null, user);
        }

        log.warn('Rejecting user %s with password %s!', username, password);
        done(null, false, { message: 'Incorrect login or password!' });
    }
}

module.exports = auth;