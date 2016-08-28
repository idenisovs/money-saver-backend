/**
 * Created by Ilya Denisov on 09.07.2016..
 */

var log = require('log4js').getLogger('get-years');
var httpCodes = require('http-status');
var bl = require('../../bl');

function getAvailableYears(req, res)
{
    log.debug('Requesting years for user %s!', req.user.login);

    bl.intervals.getYears(req.user, success, error);

    function success(years)
    {
        res.json(years);
    }

    function error(err)
    {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = getAvailableYears;