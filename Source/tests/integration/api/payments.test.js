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
    it('Get latest payment', getLatestPayment);
    it('Get payment by date', getPaymentByDate);
    it('Save payment', savePayment);
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function getLatestPayment(done)
{
    request.get(host, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.method, 'getLatestPayment');
        assert.equal(body.message, 'Not implemented yet!');
        done();
    });
}

function getPaymentByDate(done)
{
    var endpoint = host + '2015-09-09';

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.method, 'getPaymentByDate');
        assert.equal(body.message, 'Not implemented yet!');
        done();
    });
}

function savePayment(done)
{
    var options = {
        url: host,
        body: { payment: '#00001' }
    };

    request.post(options, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.method, 'savePayment');
        assert.equal(body.message, 'Not implemented yet!');
        done();
    });
}
