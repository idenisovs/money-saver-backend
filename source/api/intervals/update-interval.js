const http = require('http-status');
const log = require('log4js').getLogger('update-interval');
const bl = require('../../bl');

function updateInterval(req, res)
{
    const interval = req.body;

    interval.user = req.user;

    bl.intervals.update(interval, success, error);

    function success()
    {
        res.json({ msg: 'ok' });
    }

    function error(err)
    {
        log.error(err);

        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }

}

module.exports = updateInterval;
