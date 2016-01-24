/**
 * Created by Ga5Xz2 on 30.12.2015..
 */

var db = require('../db');

var sql = '';
sql += 'SELECT id, start, end, sum\n';
sql += 'FROM intervals\n ';
sql += 'WHERE start <= $stamp AND end >= $stamp';

function getByTime(timestamp, callback)
{
    var params = { $stamp: timestamp };

    db.get(sql, params, callback);
}

module.exports = getByTime;