/**
 * This module returns the number of latest intervals.
 * Created by I.Denisovs on 03.09.2016.
 */
var db = require('../db').default;

var sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY start DESC LIMIT $limit';

function getNthLatest(interval, callback)
{
    if (!interval.limit) {
        interval.limit = 1;
    }

    var params = { $userId: interval.user.id, $limit: interval.limit };

    db.all(sql, params, callback);
}

module.exports = getNthLatest;