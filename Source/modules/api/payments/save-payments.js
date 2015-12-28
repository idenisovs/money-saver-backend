/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

var Promise = require('promise');
var bl = require('../../bl/bl');
var http = require('../http.states');

module.exports = savePayments;

function savePayments(req, res)
{
    var payments = [];

    var q = bl.payments.save(payments);

    Promise.all(q).then(success, error);

    function success()
    {
        res.json({ message: 'ok' });
    }

    function error()
    {
        res.status(http.InternalError).send();
    }

}