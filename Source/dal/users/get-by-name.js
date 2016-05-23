/**
 * Created by I.Denisovs on 16.23.5.
 */

var db = require('./../db');

function getUserByName(username, callback)
{
    var user = { id: 1, login: 'user1', password: 'qwerty' };

    callback(null, user);
}

module.exports = getUserByName;