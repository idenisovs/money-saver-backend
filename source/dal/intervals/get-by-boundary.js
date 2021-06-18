/**
 * Created by I.Denisovs on 01.02.2016.
 */
var log = require('log4js').getLogger('get-by-boundary');
var db = require('../db').default;

var sql = '';

sql += 'SELECT id, start, end, sum, latest\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start >= $from\n';
sql += 'AND start <= $till\n';
sql += 'AND userId = $userId';

function getByBoundary(interval, callback)
{
    log.trace(JSON.stringify(interval));

    var params = { $from: interval.from, $till: interval.till, $userId: interval.user.id };

    db.all(sql, params, callback);
}

module.exports = getByBoundary;