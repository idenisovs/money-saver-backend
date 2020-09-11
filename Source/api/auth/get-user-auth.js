const log = require('log4js').getLogger('check-auth');

module.exports = function getUserAuthentication(req, res) {
    log.debug('Requested user auth status!');
    log.trace(req.user);

    const user = req.user || null;

    if (user) {
        delete user.password;
    }

    // res.json(user);
    res.status(500).json({
        message: 'Something went wrong on the server!'
    });
};
