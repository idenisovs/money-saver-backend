/**
 * Created by I.Denisovs on 02.01.2016..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE date = $date AND userId = $userId\n";
sql += "ORDER BY time ASC\n";

function getByDate(date, userId, callback)
{
    var params = { '$date': date, '$userId': userId };

    db.all(sql, params, callback);
}

module.exports = getByDate;