/**
  * Intervals REST API endpoint
  * Sample call: http://localhost:9001/api/intervals
  */

var log = require('log4js').getLogger('get-latest-interval');
var states = require('http-status');
var bl = require('../../bl');

module.exports = getLatestInterval;

function getLatestInterval(req, res)
{
    var interval = { user: req.user };

    log.debug('User %s requested latest interval!', req.user.login);

    bl.intervals.getLatest(interval, success, error);

    function success(interval)
    {
        if (!interval)
        {
            log.warn('There is no intervals yet!');

            return res.status(states.NO_CONTENT).send();
        }

        log.trace(interval);

        res.json(interval);
    }

    function error(err)
    {
        log.error(err);

        res.status(states.INTERNAL_SERVER_ERROR).json({ err: err });
    }
}