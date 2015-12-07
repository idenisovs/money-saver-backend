/**
 * This module returns the daily spendings, taken by it`s interval`s id.
 * Created by Ga5Xz2 on 18.11.2015..
 */
var db = require('./../db');

module.exports = getByIntervalId;

function getByIntervalId(id, success, error)
{
	var sql = '';
	sql += 'SELECT p.date, sum(p.sum) AS sum\n';
	sql += 'FROM intervals i\n';
	sql += 'LEFT OUTER JOIN payments p ON p.time > i.start AND p.time < i.end\n';
	sql += 'WHERE i.id = $id\n';
	sql += 'GROUP BY date';
	
	var params = { '$id': id };
	
	db.all(sql, params, done);
	
	function done(err, rows)
	{
		if (err)
		{
			log.error(err);
			error(err);
			return;
		}
		
		success(rows);
	}
}
