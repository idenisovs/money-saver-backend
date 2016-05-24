/**
 * Created by I.Denisovs on 16.24.5.
 */

var LocalStrategy = require('passport-local').Strategy;
var bl = require('../../../bl/bl');

module.exports = new LocalStrategy(bl.auth.local);