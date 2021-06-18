import passport from 'passport';
import log4js from 'log4js';
import localStrategy from './strategies/local';
import serialize from './serialize';
import deserialize from './deserialize';

const log = log4js.getLogger('passport');

passport.use(localStrategy);

passport.serializeUser(serialize);

passport.deserializeUser(deserialize);

export default passport;

log.debug('Configured!');