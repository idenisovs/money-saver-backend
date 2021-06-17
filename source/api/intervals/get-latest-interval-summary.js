/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

const statusCodes = require('http-status');
const bl = require('../../bl');
const log = require('log4js').getLogger('intervals');

function getLatestIntervalSummary(req, res)
{
    log.debug('User requested latest interval summary!');

    bl.intervals.getLatestSummary(req.user, success, error);

    function success(interval) {
        log.debug('Got response!');
        log.trace(interval);

        if (!interval) {
            return res.status(statusCodes.NO_CONTENT).json(null);
        }

        res.json(interval);
    }

    function error(err)
    {
        log.error(err);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}

module.exports = getLatestIntervalSummary;
