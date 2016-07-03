/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var statusCodes = require('http-status');
var bl = require('../../bl/bl');

function getLatestIntervalSummary(req, res)
{
    bl.intervals.getLatestSummary(req.user, success, error);

    function success(interval)
    {
        if (!interval)
        {
            return res.status(statusCodes.NO_CONTENT).json({});
        }

        res.json(interval);
    }

    function error(err)
    {
        var status = statusCodes.INTERNAL_SERVER_ERROR;

        res.status(status).json({ err: err });
    }
}

module.exports = getLatestIntervalSummary;