/**
 * Created by I.Denisovs on 16.24.5.
 */

const LocalStrategy = require('passport-local').Strategy;
const bl = require('../../../bl/index');

module.exports = new LocalStrategy(bl.auth.local);
