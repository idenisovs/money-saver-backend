/**
 * Created by I.Denisovs on 02.01.2016..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE date = $date AND userId = $userId\n";
sql += "ORDER BY time ASC\n";

function getByDate(payment, callback)
{
    var params = { '$date': payment.date, '$userId': payment.user.id };

    db.all(sql, params, callback);
}

module.exports = getByDate;