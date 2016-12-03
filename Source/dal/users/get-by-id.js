/**
 * Get user`s data by user`s Id.
 *
 * Created by I.Denisovs on 16.23.5.
 */

var db = require('./../db');

var sql = "";

sql += "SELECT id, login, password, email, timezone, language\n";
sql += "FROM users\n";
sql += "WHERE id = $id";

function getById(id, done)
{
    var params = { $id: id };

    db.get(sql, params, done);
}

module.exports = getById;