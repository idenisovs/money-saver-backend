/**
 * Get user`s data by username.
 * Created by I.Denisovs on 16.23.5.
 */

var log = require('log4js').getLogger('getUserByName');
var db = require('./../db');

var sql = "";

sql += "SELECT id, login, password\n";
sql += "FROM users\n";
sql += "WHERE login = $username";

function getUserByName(username, done)
{
    log.debug('Requesting user %s...', username);

    var params = { $username: username };

    db.get(sql, params, done);
}

module.exports = getUserByName;