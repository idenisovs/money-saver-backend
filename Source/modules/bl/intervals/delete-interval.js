/**
 * Created by Ga5Xz2 on 26.12.2015..
 */

var dal = require('../../dal/dal');

module.exports = deleteInterval;

function deleteInterval(id, success, error)
{
    dal.intervals.delete(id, done);

    function done(err)
    {
        if (err)
        {
            error(err);
            return;
        }

        success();
    }
}