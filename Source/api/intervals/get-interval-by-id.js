/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('http-status');
var bl = require('../../bl/bl');

function getIntervalById(req, res)
{
    var interval = { id: req.params.id, user: req.user };

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