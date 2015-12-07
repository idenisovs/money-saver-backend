/**
 * This module returns the latest interval.
 * Created by Ga5Xz2 on 17.11.2015..
 */
var db = require('./../db');

module.exports = getLatest;

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