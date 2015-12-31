/**
 * Created by Ga5Xz2 on 11.12.2015..
 */
var request = require('request');
var chai = require('chai');
var assert = chai.assert;

var host = 'http://localhost:9001/api/payments/';

describe('Payments REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(setRequestDefaults);
    it('Get payments', getPayments);
    //it('Get payment by date', getPaymentsByDate);
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function getPayments(done)
{
    request(host, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.message, 'getPayments');
        done();
    });
}

function getPaymentsByDate(done)
{
    var expectedDate = '2015-12-21';
    var endpoint = host + expectedDate;

    request(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.message, 'getPaymentsByDate');
        assert.equal(body.date, expectedDate);
        done();
    });
}