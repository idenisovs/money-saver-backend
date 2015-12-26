/**
 * Created by Ga5Xz2 on 26.12.2015..
 */

var db = require('./../db');

var sql = 'INSERT INTO intervals (start, end, sum) VALUES ($start, $end, $sum)';

module.exports = createInterval;

function createInterval(interval, callback)
{
    var params = { $start: interval.start, $end: interval.end, $sum: interval.sum };

    db.run(sql, params, done);

    function done(err)
    {
        if (err)
        {
            callback(err, null);
        }
        else
        {
            callback(err, this.lastID);
        }
    }
}