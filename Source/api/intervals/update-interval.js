/**
 * This endpoint is used to update existing Interval
 * Created by Ilya Denisov on 12.03.2016..
 */

var log = require('log4js').getLogger('update-interval');
var http = require('http-status');
var bl = require('../../bl/bl');

function updateInterval(req, res)
{
    var interval = req.body;

    interval.user = req.user;

    bl.intervals.update(interval, success, error);

    function success()
    {
        res.json({ msg: 'ok' });
    }

    function error(err)
    {
        log.error(err);

        res.statusCode(http.INTERNAL_SERVER_ERROR).json(err);
    }

}

module.exports = updateInterval;