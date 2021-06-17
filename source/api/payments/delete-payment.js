/**
 * Created by I. Denisovs on 31.12.2015..
 */
var util = require('util');
var log = require('log4js').getLogger('delete-payment');
var bl = require('../../bl');
var http = require('http-status');

function deletePayments(req, res)
{
    log.trace(req.query);
    
    bl.payments.delete(req, success, error);

    function success(removed)
    {
        var response = { removed: removed };

        log.debug(response);
        res.json(response);
    }

    function error(err)
    {
        log.error(err);
        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }
}

module.exports = deletePayments;