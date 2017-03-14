/**
 * Created by I.Denisovs on 16.23.5.
 */

var users =
{
    getByName: require('./get-by-name'),
    
    getById: require('./get-by-id'),

    saveLoginTime: require('./save-login-time')
};

module.exports = users;