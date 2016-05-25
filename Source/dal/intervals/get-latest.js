/**
 * This module returns the latest interval.
 * Created by I.Denisovs on 17.11.2015..
 */
var db = require('./../db');

module.exports = getLatest;

var sql = '';
sql += 'SELECT id, start, end, sum\n';
sql += 'FROM intervals\n';
sql += 'WHERE userId = $userId\n';
sql += 'ORDER BY id DESC LIMIT 1';

function getLatest(userId, callback)
{
    var params = { $userId: userId };

    db.get(sql, params, callback);
}