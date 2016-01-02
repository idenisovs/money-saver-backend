/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var db = require('./../db');

module.exports = getByDate;

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE date = $date\n";

function getByDate(date, callback)
{
    var params = { '$date': date };

    db.all(sql, params, callback);
}