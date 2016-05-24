/**
 * Created by I.Denisovs on 16.17.5.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var log = require('log4js').getLogger('passport');
var bl = require('../bl/bl');

passport.use(new LocalStrategy(bl.auth.local));

passport.serializeUser(serialize);

passport.deserializeUser(deserialize);

module.exports = passport;

log.info('Configured!');

function serialize(user, done)
{
    done(null, user.id);
}

function deserialize(id, done)
{
    bl.users.getById(id, success, error);

    function success(user)
    {
        done(null, user);
    }

    function error(err)
    {
        done(err);
    }
}