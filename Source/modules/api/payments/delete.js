/**
 * Created by Ga5Xz2 on 31.12.2015..
 */
var util = require('util');
var bl = require('../../bl/bl');
var http = require('../http.states');

function deletePayments(req, res)
{
    bl.payments.delete(req, success, error);

    function success(removed)
    {
        res.json({ removed: removed });
    }

    function error(err)
    {
        res.status(http.InternalError).json(err);
    }
}

module.exports = deletePayments;