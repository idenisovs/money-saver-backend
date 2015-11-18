/**
 * This module contains data operations for table Intervals
 * Created by Ga5Xz2 on 13.09.2015..
 */
var db = require('./db');

var intervals = {};

intervals.getLatest = getLatest;

module.exports = intervals;

function getLatest(success, error)
{
    var sql = 'SELECT id, start, end, sum FROM intervals ORDER BY id DESC LIMIT 1';

    db.get(sql, onDone);

    function onDone(err, row)
    {
        if (err)
        {
            error(err);
            return;
        }

        success(row);
    }
}