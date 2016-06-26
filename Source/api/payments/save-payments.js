/**
 * Created by I. Denisovs on 28.12.2015..
 */

var log = require('log4js').getLogger('save-payments');
var http = require('http-status');
var bl = require('../../bl/bl');


module.exports = savePayments;

function savePayments(req, res)
{
    req.body.user = req.user;

    bl.payments.save(req.body, success, error);

    function success()
    {
        res.send();
    }

    function error(reason)
    {
        log.error(reason);
        res.status(http.INTERNAL_SERVER_ERROR).json(reason);
    }
}