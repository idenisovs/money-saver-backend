/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('http-status');
var bl = require('../../bl/bl');

function deleteInterval(req, res)
{
    bl.intervals.delete(req.params.id, req.user, success, error);

    function success(result)
    {
        res.json(result);
    }

    function error(err)
    {
        if (err.reason === 'param')
        {
            res.status(states.NOT_FOUND);
        }
        else
        {
            res.status(states.INTERNAL_SERVER_ERROR);
        }

        res.json(err);
    }
}

module.exports = deleteInterval;