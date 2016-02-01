/**
 * Created by Ga5Xz2 on 01.02.2016.
 */

var db = require('../db');

var sql = '';

sql += 'SELECT id, start, end, sum\n';
sql += 'FROM intervals\n ';
sql += 'WHERE start >= $from AND end <= $till';

function getByBoundary(from, till, callback)
{
    var params = { $from: from, $till: till };

    db.all(sql, params, callback);
}

module.exports = getByBoundary;