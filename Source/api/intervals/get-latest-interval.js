/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('http-status');
var bl = require('../../bl/bl');

module.exports = getLatestInterval;

function getLatestInterval(req, res)
{
    bl.intervals.getLatest(success, error);

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}