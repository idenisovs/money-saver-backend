/**
 * Created by I. Denisovs on 02.01.2016..
 */
var util = require('util');
var moment = require('moment');
var request = require('../request');
var assert = require('chai').assert;
var host = require('../host.json').host;
var createPayments = require('../helper/create-payments');
var deletePayments = require('../helper/delete-payments');

function updatePaymentsTests()
{
    beforeEach(createPayments);
    beforeEach(setOptions);

    it('Add payment', createPayment);
    it('Modify payment', modifyPayment);
    it('Delete payment', deletePayment);
    it('Process list of payments', listOfPayments);

    afterEach(deletePayments);
}

module.exports = updatePaymentsTests;

var endpoint = host.payments;
var options;

function setOptions()
{
    options = { url: endpoint };
}

function createPayment(done)
{
    var date = '2015-12-07T12:45';

    var payment = { time: moment(date).valueOf(), sum: 3.21 };

    options.body = payment;

    request.put(options, paymentSaved);

    function paymentSaved(err, res, body)
    {
        defaultValidation(err, res, body);

        var expectedDate = '2015-12-07';

        var getByDate = util.format('%s?date=%s', host.payments, expectedDate);

        delete options.body;

        options.url = getByDate;

        request.get(options, validate);
    }

    function validate(err, res, payments)
    {
        defaultValidation(err, res, payments);

        assert.isArray(payments);
        assert.equal(payments.length, 2);

        var actualPayment = null;

        for (var i = 0; i < payments.length; i++)
        {
            if (payments[i].sum === 3.21)
            {
                actualPayment = payments[i];
                break;
            }
        }

        assert.isNotNull(actualPayment);
        assert.equal(actualPayment.time, payment.time);
        done();
    }
}

function modifyPayment(done)
{
    var expectedDate = '2015-12-07';

    options.url = util.format('%s?date=%s', host.payments, expectedDate);

    request.get(options, takePayment);

    function takePayment(err, res, payments)
    {
        defaultValidation(err, res, payments);

        var payment = payments.pop();

        payment.sum = 3.21;

        options.body = payment;

        options.url = host.payments;

        request.put(options, savePayment);
    }

    function savePayment(err, res, result)
    {
        defaultValidation(err, res, result);

        assert.equal(result.stat.updated, 1);

        delete options.body;

        options.url = util.format('%s?date=%s', host.payments, expectedDate);

        request.get(options, validate);
    }

    function validate(err, res, payments)
    {
        defaultValidation(err, res, payments);

        var payment = payments.pop();

        assert.equal(payment.sum, 3.21);

        done();
    }
}

function deletePayment()
{
    assert.equal(true, true);
}

function listOfPayments()
{
    assert.equal(true, true);
}

function defaultValidation(err, res, body)
{
    assert.isNull(err);
    assert.equal(res.statusCode, 200, JSON.stringify(body));
}