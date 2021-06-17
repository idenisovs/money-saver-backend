const LocalStrategy = require('passport-local').Strategy;
const bl = require('../../../bl');

const strategy = new LocalStrategy(bl.auth.local);

export default strategy;
