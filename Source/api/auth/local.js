/**
 * Local authentication strategy.
 * Created by I.Denisovs on 16.23.5.
 */

var passport = require('passport');

var redirects =
{
    successRedirect: '/api/auth/success',
    failureRedirect: '/api/auth/failure'
};

module.exports = passport.authenticate('local', redirects);