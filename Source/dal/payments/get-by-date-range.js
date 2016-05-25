/**
 * Created by I.Denisovs on 02.01.2016..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE time BETWEEN $from AND $till AND userId = $userId\n";
sql += "ORDER BY time ASC";

function getByDateRange(from, till, userId, callback)
{
    var params = { '$from': from, '$till': till, '$userId': userId };

    db.all(sql, params, callback);
}

module.exports = getByDateRange;