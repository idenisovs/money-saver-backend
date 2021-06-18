const auth = require('express').Router();
const passport = require('../../support/passport').default;
const checkAuth = require('../../support/middleware/auth-middleware');

const authenticate = passport.authenticate('local');

auth.get('/', require('./get-user-auth'));
auth.post('/', authenticate, require('./complete'));
auth.get('/logout', checkAuth, require('./logout'));

module.exports = auth;

require('log4js').getLogger('api').debug('Auth module is up!');
