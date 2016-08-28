/**
 * Created by I. Denisovs on 30.12.2015..
 */

var dal = require('../../dal');

function getByTime(interval, success, error)
{
    dal.intervals.getByTime(interval, done);

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