import passport from 'passport';
import log4js from 'log4js';
import localStrategy from './strategies/local';

const log = log4js.getLogger('passport');

passport.use(localStrategy);

passport.serializeUser(require('./serialize'));

passport.deserializeUser(require('./deserialize'));

module.exports = passport;

log.debug('Configured!');