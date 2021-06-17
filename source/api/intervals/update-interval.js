/**
 * This endpoint is used to update existing Interval
 * Created by Ilya Denisov on 12.03.2016..
 */

const http = require('http-status');
const log = require('../../support/logger')();
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
