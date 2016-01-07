/**
 * Created by Ga5Xz2 on 31.12.2015..
 */
var util = require('util');
var log = require('log4js').getLogger('delete-payment');
var bl = require('../../bl/bl');
var http = require('../http.states');

function deletePayments(req, res)
{
    log.debug(req.query);
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
        res.status(http.InternalError).json(err);
    }
}

module.exports = deletePayments;