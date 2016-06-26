/**
 * Created by I. Denisovs on 02.01.2016..
 */
var util = require('util');
var request = require('../request');
var assert = require('chai').assert;
var host = require('../host.json').host;
var helper = require('../helper/helper');

function getPaymentsTests()
{
    before(helper.createPayments);

    it('Request wout params', getPaymentsWoutParams);
    it('Get Payment by Id', getPaymentById);
    it('Get Payments by Date', getPaymentsByDate);
    it('Get Payments by From and Till params', getPaymentsByDateRange);
	
	after(helper.deletePayments);
}

module.exports = getPaymentsTests;

function getPaymentsWoutParams(done)
{
    request.get(host.payments, validate);

    function validate(err, res, payments)
    {
        defaultValidation(err, res, payments);

        assert.isArray(payments);
        assert.equal(payments.length, 10);

        done();
    }
}

function getPaymentById(done)
{
    var expectedPayment;
    var expectedDate = '2015-12-07';
    var endpoint = util.format('%s?date=%s', host.payments, expectedDate);

    request.get(endpoint, onPaymentReceived);

    function onPaymentReceived(err, res, payments)
    {
        defaultValidation(err, res, payments);

        expectedPayment = payments[0];

        endpoint = util.format('%s?id=%d', host.payments, expectedPayment.id);

        request.get(endpoint, validate);
    }

    function validate(err, res, payment)
    {
        defaultValidation(err, res, payment);

        assert.deepEqual(payment, expectedPayment);

        done();
    }
}

function getPaymentsByDate(done)
{
    var expectedDate = '2015-12-08';
    var endpoint = util.format('%s?date=%s', host.payments, expectedDate);

    request.get(endpoint, validate);

    function validate(err, res, payments)
    {
        defaultValidation(err, res, payments);

        assert.isArray(payments);
        assert.equal(payments.length, 3);
        assert.equal(payments[0].date, expectedDate);

        done();
    }
}

function getPaymentsByDateRange(done)
{
    var from = '2015-12-01';
    var till = '2015-12-05';

    var endpoint = util.format('%s?from=%s&till=%s', host.payments, from ,till);

    request.get(endpoint, validate);

    function validate(err, res, payments)
    {
        defaultValidation(err, res, payments);

        assert.isArray(payments);

        var paymentCount = payments.length;
        assert.equal(paymentCount, 8);

        var firstPayment = payments[0];
        assert.equal(firstPayment.date, from);
        assert.equal(firstPayment.sum, 12.15);

        var lastPayment = payments[paymentCount-1];
        assert.equal(lastPayment.date, till);
        assert.equal(lastPayment.sum, 9.76);

        done();
    }
}

function defaultValidation(err, res, body)
{
    assert.isNull(err);
    assert.equal(res.statusCode, 200);
}