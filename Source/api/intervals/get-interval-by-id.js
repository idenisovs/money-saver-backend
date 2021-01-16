/**
 * Intervals REST API endpoint
 * Sample call: http://localhost:9001/api/intervals
 */
const states = require('http-status');
const bl = require('../../bl');

function getIntervalById(req, res)
{
    const interval = {id: req.params.id, user: req.user};

    bl.intervals.getById(interval, success, error);

    function success(result)
    {
        res.json(result);
    }

    function error(err)
    {
        res.status(states.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}

module.exports = getIntervalById;
