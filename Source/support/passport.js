/**
 * Initialization module of Passport.js
 * Created by I.Denisovs on 16.17.5.
 */

var passport = require('passport');
var log = require('log4js').getLogger('passport');

passport.use(require('./passport/strategies/local'));

passport.serializeUser(require('./passport/serialize'));

passport.deserializeUser(require('./passport/deserialize'));

module.exports = passport;

log.debug('Configured!');