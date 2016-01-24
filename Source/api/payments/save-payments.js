/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var bl = require('../../bl/bl');
var http = require('../http.states.js');

module.exports = savePayments;

function savePayments(req, res)
{
    bl.payments.save(req.body, success, error);

    function success()
    {
        res.send();
    }

    function error(reason)
    {
        res.status(http.InternalError).json(reason);
    }
}