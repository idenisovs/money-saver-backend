/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('../http.states.js');
var bl = require('../../bl/bl');

function createInterval(req, res)
{
    bl.intervals.create(req.body, success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        if (err.reason === 'param')
        {
            res.status(states.BadRequest);
        }
        else
        {
            res.status(states.InternalError);
        }

        res.json(err);
    }
}

module.exports = createInterval;