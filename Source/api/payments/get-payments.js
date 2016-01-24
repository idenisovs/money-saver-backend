/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var http = require('http-status');
var bl = require('../../bl/bl');

module.exports = getPayments;

function getPayments(req, res)
{
    bl.payments.get(req.query, success, error);

    function success(payments)
    {
        res.json(payments);
    }

    function error(err)
    {
        res.status(http.INTERNAL_SERVER_ERROR).json(err);
    }

}