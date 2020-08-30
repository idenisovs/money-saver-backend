const log = require('log4js').getLogger('check-auth');

module.exports = function getUserAuthentication(req, res) {
    log.debug('Requested user auth status!');
    log.trace(req.user);

    const user = req.user || {
        name: 'abc def'
    };

    if (user) {
        delete user.password;
    }

    res.json(user);
};
