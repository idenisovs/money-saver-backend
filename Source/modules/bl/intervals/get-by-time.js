/**
 * Created by Ga5Xz2 on 30.12.2015..
 */

var dal = require('../../dal/dal');

function getByTime(timestamp, success, error)
{
    dal.intervals.getByTime(timestamp, done);

    function done(err, interval)
    {
        if (err)
        {
            error(err);
            return;
        }

        success(interval);
    }
}

module.exports = getByTime;