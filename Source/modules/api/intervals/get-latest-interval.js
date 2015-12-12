/**
 * Created by Ga5Xz2 on 12.12.2015..
 */

var bl = require('../../bl/bl');

function getLatestInterval(req, res)
{
    bl.intervals.getLatest(success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.InternalError).json(err);
    }
}

module.exports = getLatestInterval;