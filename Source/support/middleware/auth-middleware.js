/**
 * Used to control access for endpoints, where anonymous calls is not permitted.
 * Created by I.Denisovs on 16.24.5.
 */

const log = require('log4js').getLogger('auth');
const HttpStatus = require('http-status');

module.exports = function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    log.warn('Unauthorized access try to %s from %s!', req.originalUrl, req.ip);

    const message = 'Hello, %username%! Please, authenticate yourself first!';

    res.status(HttpStatus.UNAUTHORIZED).send(message);
};
