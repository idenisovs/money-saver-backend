/**
 * Created by I.Denisovs on 26.12.2015..
 */

var db = require('./../db');

var sql = 'INSERT INTO intervals (start, end, sum, userId) VALUES ($start, $end, $sum, $userId)';

module.exports = createInterval;

function createInterval(interval, userId, callback)
{
    var params =
    {
        $start: interval.start,
        $end: interval.end,
        $sum: interval.sum,
        $userId: userId
    };

    db.run(sql, params, done);

    function done(err)
    {
        callback.lastID = this.lastID;

        callback(err);
    }
}