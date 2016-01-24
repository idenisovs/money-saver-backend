/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var states = require('http-status');
var bl = require('../../bl/bl');

function getIntervals(req, res)
{
    var from = req.query.from ? req.query.from : null;
    var till = req.query.till ? req.query.till : null;
    var time = req.query.timestamp ? req.query.timestamp : null;

    if (time)
    {
        bl.intervals.getByTime(time, success, error);
    }
    else
    {
        res.json({ message: 'getIntervalsAvailable', from: from, till: till });
    }

    function success(interval)
    {
        res.json(interval);
    }

    function error(err)
    {
        res.status(states.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}

module.exports = getIntervals;