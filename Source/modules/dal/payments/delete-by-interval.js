/**
 * Created by Ga5Xz2 on 31.12.2015..
 */

var db = require('../../dal/db');

var sql = 'DELETE FROM payments WHERE time BETWEEN $start AND $end';

function deleteByInterval(interval, callback)
{
    var params = { $start: interval.start, $end: interval.end };

    db.run(sql, params, done);

    function done(err)
    {
        callback(err, this.changes);
    }
}

module.exports = deleteByInterval;