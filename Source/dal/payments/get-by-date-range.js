/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE time BETWEEN $from AND $till\n";
sql += "ORDER BY time ASC";

function getByDateRange(from, till, callback)
{
    var params = { '$from': from, '$till': till };

    db.all(sql, params, callback);
}

module.exports = getByDateRange;