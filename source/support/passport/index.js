const passport = require('passport');

const log = require('log4js').getLogger('passport');

passport.use(require('./strategies/local'));

passport.serializeUser(require('./serialize'));

passport.deserializeUser(require('./deserialize'));

module.exports = passport;

log.debug('Configured!');