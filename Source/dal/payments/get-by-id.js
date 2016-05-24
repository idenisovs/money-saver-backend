/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE id = $id\n";

function getById(id, callback)
{
    var params = { '$id': id };

    db.get(sql, params, callback);
}

module.exports = getById;