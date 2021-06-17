const db = require('./../db');

let sql = "";

sql += "SELECT p.date, sum(p.sum) AS sum\n";
sql += "FROM intervals i\n";
sql += "LEFT OUTER JOIN payments p ON p.time > i.start AND p.time <= i.end\n";
sql += "WHERE i.id = $id AND p.userId = $userId\n";
sql += "GROUP BY date\n";

function getDailySpendings(interval, callback)
{
    const params = { '$id': interval.id, '$userId': interval.user.id };

    db.all(sql, params, callback);
}

module.exports = getDailySpendings;