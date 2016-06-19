/**
 * Created by I.Denisovs on 01.02.2016.
 */
var log = require('log4js').getLogger('get-by-boundary');
var db = require('../db');

var sql = '';

sql += 'SELECT id, start, end, sum\n';
sql += 'FROM intervals\n ';
sql += 'WHERE\n';
sql += 'start >= $from\n';
sql += 'AND end <= $till\n';
sql += 'AND userId = $userId';

function getByBoundary(from, till, userId, callback)
{
    log.trace('From: %s, Till: %s, UserID: %s', from, till, userId);

    var params = { $from: from, $till: till, $userId: userId };

    db.all(sql, params, callback);
}

module.exports = getByBoundary;