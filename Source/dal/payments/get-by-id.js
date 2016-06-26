/**
 * Created by I.Denisovs on 02.01.2016..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT id, date, time, sum\n";
sql += "FROM payments\n";
sql += "WHERE id = $id\n";
sql += "AND userId = $userId\n";

function getById(payment, callback)
{
    var params = { '$id': payment.id, '$userId': payment.user.id };

    db.get(sql, params, callback);
}

module.exports = getById;