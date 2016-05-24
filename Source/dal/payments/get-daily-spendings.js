/**
 * Created by Ga5Xz2 on 19.12.2015..
 */
var db = require('./../db');

var sql = "";

sql += "SELECT p.date, sum(p.sum) AS sum\n";
sql += "FROM intervals i\n";
sql += "LEFT OUTER JOIN payments p ON p.time > i.start AND p.time < i.end\n";
sql += "WHERE i.id = $id\n";
sql += "GROUP BY date\n";

function getDailySpendings(intervalId, callback)
{
    var params = { '$id': intervalId };

    db.all(sql, params, callback);
}

module.exports = getDailySpendings;