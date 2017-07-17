/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var log = require('log4js').getLogger('update-payments');
var http = require('http-status');
var bl = require('../../bl');

function updatePayments(req, res)
{
    log.debug('api called!');

    req.body.user = req.user;

    bl.payments.update(req.body, success, fail);

    function success(result)
    {
        res.json(result);
    }

    function fail(err)
    {
        res.statusCode(http.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = updatePayments;