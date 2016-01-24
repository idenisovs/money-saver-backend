/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('../http.states.js');
var bl = require('../../bl/bl');

function deleteInterval(req, res)
{
    bl.intervals.delete(req.params.id, success, error);

    function success(result)
    {
        res.json(result);
    }

    function error(err)
    {
        if (err.reason === 'param')
        {
            res.status(states.NotFound);
        }
        else
        {
            res.status(states.InternalError);
        }

        res.json(err);
    }
}

module.exports = deleteInterval;