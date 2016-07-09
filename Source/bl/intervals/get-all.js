/**
 * Created by Ilya Denisov on 09.07.2016..
 */

var dal = require('../../dal/dal');

function getAllIntervals(user, success, error)
{
    dal.intervals.getAll(user, done);

    function done(err, intervals)
    {
        if (err)
        {
            return error(err);
        }

        success(intervals);
    }
}

module.exports = getAllIntervals;