/**
 * Created by Ga5Xz2 on 26.12.2015..
 */
var util = require('util');
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

        if (done.lastID === null)
        {
            var message = 'There is no record with such id: ' + id;
            error({ reason: 'param', message:  message });
            return;
        }

        success();
    }
}