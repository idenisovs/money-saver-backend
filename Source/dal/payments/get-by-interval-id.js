/**
 * This module returns the daily spendings, taken by it`s interval`s id.
 * Created by I.Denisovs on 18.11.2015..
 */
var db = require('./../db');

var sql = '';

sql += 'SELECT p.date, sum(p.sum) AS sum\n';
sql += 'FROM intervals i\n';
sql += 'LEFT OUTER JOIN payments p ON p.time > i.start AND p.time < i.end\n';
sql += 'WHERE i.id = $id AND p.userId = $userId\n';
sql += 'GROUP BY date';

function getByIntervalId(id, userId, callback)
{
	var params = { '$id': id, '$userId': userId };
	
	db.all(sql, params, callback);
}

module.exports = getByIntervalId;

