/**
 * Root module of authentication BL functions.
 * Created by I.Denisovs on 16.17.5.
 */

const auth = {
    local: require('./auth-local')
};

module.exports = auth;
