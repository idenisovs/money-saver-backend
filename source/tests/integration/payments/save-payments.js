/**
 * Created by I. Denisovs on 02.01.2016..
 */
var util = require('util');
var moment = require('moment');
var request = require('../request');
var assert = require('chai').assert;
var host = require('../host.json').host;
var defaultValidation = require('../helper/default-validation');

var date, payment, nextDate, secondPayment;

function savePaymentsTests()
{
    beforeEach(defineOptions);

    it('Save single payment', singlePaymentTest);
    it('Save list of payments', listOfPaymentsTest);
    it('Payment is outside of any interval', outsideOfIntervalTest);
    it('Missed Date field', missedDateTest);
    it('Missed Time field', missedTimeTest);
    it('Missed Date and Time fields', missedDateAndTimeTest);
    it('Missed Sum field', missedSumTest);
	it('Saving Date in incorrect format', invalidDateTest);

    afterEach(clearPayments);
}

module.exports = savePaymentsTests;

var options;

function defineOptions()
{
    date = moment('2015-12-13 18:32:47');
    payment = { date: date.format('YYYY-MM-DD'), time: date.valueOf(), sum: 1.23 };

    nextDate = moment(date).add(1, 'days');
    secondPayment = { date: nextDate.format('YYYY-MM-DD'), time: nextDate.valueOf(), sum: 2.34 };

    options = { url: host.payments, body: payment };
}

function clearPayments(done)
{
    var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-13', '2015-12-14');

    request.del(endpoint, defaultValidation(done, true));
}

function singlePaymentTest(done)
{
    request.post(options, defaultValidation(validate));

    function validate()
    {
        var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-13', '2015-12-13');

        request.get(endpoint, defaultValidation(checkSavedPayment));
    }

    function checkSavedPayment(payments)
    {
        assert.equal(payments.length, 1);

        var actualPayment = payments.pop();

        assert.equal(actualPayment.sum, payment.sum);
        assert.equal(actualPayment.date, payment.date);
        assert.equal(actualPayment.time, payment.time);

        done();
    }
}

function listOfPaymentsTest(done)
{
    options.body = [ payment, secondPayment ];

    request.post(options, defaultValidation(validate));

    function validate()
    {
        var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-13', '2015-12-14');

        request.get(endpoint, defaultValidation(checkSavedPayment));
    }

    function checkSavedPayment(payments)
    {
        assert.equal(payments.length, 2);
        done();
    }
}

function outsideOfIntervalTest(done)
{
    var failedDate = moment('2016-12-13 12:12:12');

    var invalidPayment = { date: failedDate.format('YYYY-MM-DD'), time: failedDate.valueOf(), sum: 3.21 };

    options.body = [ invalidPayment ];

    request.post(options, validate);

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 500, 'Payment outside of interval should be rejected!');
        assert.property(body, 'message');
        assert.match(body.message, /^Given payment does not belong/);
        assert.property(body, 'payment');
        assert.deepEqual(body.payment, invalidPayment);
        done();
    }
}

function missedDateTest(done)
{
    delete options.body.date;

    request.post(options, defaultValidation(validate));

    function validate()
    {
        var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-13', '2015-12-13');

        request.get(endpoint, defaultValidation(checkSavedPayment));
    }

    function checkSavedPayment(payments)
    {
        var actualPayment = payments.pop();

        assert.equal(actualPayment.date, '2015-12-13');

        done();
    }
}

function missedTimeTest(done)
{
    delete options.body.time;

    request.post(options, defaultValidation(validate));

    function validate()
    {
        var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-13', '2015-12-13');

        request.get(endpoint, defaultValidation(checkSavedPayment));
    }

    function checkSavedPayment(payments)
    {
        var actualPayment = payments.pop();

        assert.equal(actualPayment.time, moment('2015-12-13').valueOf());

        done();
    }
}

function missedDateAndTimeTest(done)
{
    delete options.body.time;
    delete options.body.date;

    request.post(options, validate);

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(body.payment.date, moment().format('YYYY-MM-DD'));
        done();
    }
}

function missedSumTest(done)
{
    delete options.body.sum;

    request.post(options, validate);

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 500, 'Payment without defined Sum should be rejected!');
        assert.match(body.message, /^Error: Sum field/);
        done();
    }
}

function invalidDateTest(done)
{
	options.body.date += 'T12:12:12';

	request.post(options, getSavedPayment);

	function getSavedPayment(err, res, body)
	{
        var endpoint = util.format('%s?from=%s&till=%s', host.payments, '2015-12-13', '2015-12-13');

		request.get(endpoint, validate);
	}

	function validate(err, res, body)
	{
		assert.equal(body.pop().date, '2015-12-13');
	
		done();
	}
}