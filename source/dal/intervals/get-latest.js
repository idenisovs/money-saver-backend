/**
 * This module returns the latest interval.
 * Created by I.Denisovs on 17.11.2015..
 */
var db = require('../db').default;

module.exports = getLatest;

var sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY start DESC LIMIT 1';

function getLatest(interval, callback)
{
    var params = { $userId: interval.user.id };

    db.get(sql, params, callback);
}