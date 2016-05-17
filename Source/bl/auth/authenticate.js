/**
 * Created by I.Denisovs on 16.17.5.
 */

var log = require('log4js').getLogger('auth');

function authenticate(user, callback)
{
    log.debug('User %s trying to login...', user.login);

    setTimeout(function(){
        log.debug('User %s is ok.', user.login);
        callback();
    }, 2500);

}

module.exports = authenticate;