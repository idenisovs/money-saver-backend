/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('http-status');
var bl = require('../../bl/bl');

function createInterval(req, res)
{
    bl.intervals.create(req.body, req.user, success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        if (err.reason === 'param')
        {
            res.status(states.BAD_REQUEST);
        }
        else
        {
            res.status(states.INTERNAL_SERVER_ERROR);
        }

        res.json(err);
    }
}

module.exports = createInterval;