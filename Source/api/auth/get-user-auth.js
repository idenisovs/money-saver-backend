const log = require('log4js').getLogger('check-auth');

module.exports = function getUserAuthentication(req, res) {
    log.debug('Requested user auth status!');
    log.trace(req.user);

    res.json({
        user: req.user || null
    });
};
