/**
 * Created by I.Denisovs on 31.12.2015..
 */

var db = require('../db');

var sql = 'DELETE FROM payments WHERE time BETWEEN $start AND $end AND userId = $userId';

function deleteByInterval(interval, userId, callback)
{
    var params = { $start: interval.start, $end: interval.end, $userId: userId };

    db.run(sql, params, done);

    function done(err)
    {
        callback(err, this.changes);
    }
}

module.exports = deleteByInterval;