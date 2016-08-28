/**
 * Created by I. Denisovs on 28.12.2015..
 */

var http = require('http-status');
var bl = require('../../bl');

module.exports = getPayments;

function getPayments(req, res)
{
    req.query.user = req.user;

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