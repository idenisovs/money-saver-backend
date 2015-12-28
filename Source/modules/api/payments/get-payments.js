/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var http = require('../http.states');
var bl = require('../../bl/bl');

module.exports = getPayments;

function getPayments(req, res)
{
    var result = { message: 'getPayments' };

    bl.payments.get(req.query, success, error);

    function success(payments)
    {
        result.payments = payments;

        res.json(result);
    }

    function error(err)
    {
        res.status(http.InternalError).json(err);
    }

}