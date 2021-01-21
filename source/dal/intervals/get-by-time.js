/**
 * Created by I.Denisovs on 30.12.2015..
 */

var db = require('../db');

var sql = '';
sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start <= $stamp\n';
sql += 'AND end >= $stamp\n';
sql += 'AND userId = $userId';

function getByTime(interval, callback)
{
    var params = { $stamp: interval.time, $userId: interval.user.id };

    db.get(sql, params, callback);
}

module.exports = getByTime;