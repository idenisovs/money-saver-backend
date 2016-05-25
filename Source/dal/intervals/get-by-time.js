/**
 * Created by I.Denisovs on 30.12.2015..
 */

var db = require('../db');

var sql = '';
sql += 'SELECT id, start, end, sum\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start <= $stamp\n';
sql += 'AND end >= $stamp\n';
sql += 'AND userId = $userId';

function getByTime(timestamp, userId, callback)
{
    var params = { $stamp: timestamp, $userId: userId };

    db.get(sql, params, callback);
}

module.exports = getByTime;