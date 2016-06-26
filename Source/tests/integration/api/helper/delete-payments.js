/**
 * This method helps to clean predefined Payments table.
 * Created by I. Denisovs on 02.01.2016..
 */
var util = require('util');
var request = require('../request');
var host = require('../host.json').host;
var assert = require('chai').assert;

function deletePayments(done)
{
    var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-01', '2015-12-31');

    request.del(endpoint, onDeleteDone);

    function onDeleteDone(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
}

module.exports = deletePayments;