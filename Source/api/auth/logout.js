/**
 * Created by I.Denisovs on 16.30.5.
 */

const log = require('log4js').getLogger('auth');

function logout(req, res) {
    log.debug('User %s logging out!', req.user.login);

    req.logout();

    res.redirect('/login');
}

module.exports = logout;
