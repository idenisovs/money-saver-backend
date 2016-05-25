/**
 * Created by Ga5Xz2 on 30.12.2015..
 */

var dal = require('../../dal/dal');

function getByTime(timestamp, user, success, error)
{
    dal.intervals.getByTime(timestamp, user.id, done);

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