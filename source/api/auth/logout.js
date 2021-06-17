const log = require('log4js').getLogger('auth');

function logout(req, res) {
    log.debug('User %s logging out!', req.user.login);

    req.logout();

    res.send();
}

module.exports = logout;
