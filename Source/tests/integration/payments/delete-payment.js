/**
 * Created by I. Denisovs on 02.01.2016..
 */
var util = require('util');
var moment = require('moment');
var request = require('../request');
var assert = require('chai').assert;
var host = require('../host.json').host;
var helper = require('../helper/helper');

function deletePaymentTests()
{
	beforeEach(helper.createPayments);
	
    it('Till and From field specified', tillAndFromSpecified);
	it('Delete payments by Id', deletePaymentsById);
	it('Delete payments by interval Id', deletePaymentsByIntervalId);
	
	afterEach(helper.deletePayments);
}

module.exports = deletePaymentTests;

function tillAndFromSpecified(done)
{
	var from = '2015-12-03';
	var till = '2015-12-06';
	var query = util.format('?from=%s&till=%s', from, till);
    
	var endpoint = util.format('%s?from=%s&till=%s', host.payments, from, till);
	
	request.del(endpoint, validate);
	
	function validate(err, res, body)
	{
		defaultValidation(err, res, body);
		
		assert.equal(body.removed, 6);
		
		done();
	}
}

function deletePaymentsById(done)
{
	var date = '2015-12-03';
	
	var endpoint = util.format('%s?from=%s&till=%s', host.payments, date, date);
	
	request.get(endpoint, processPaymentList);
	
	function processPaymentList(err, res, payments)
	{
		defaultValidation(err, res, payments);
		
		assert.equal(payments.length, 2);
		
		endpoint = util.format('%s?id=%s', host.payments, payments[0].id);
		
		request.del(endpoint, validate);
	}
	
	function validate(err, res, body)
	{
		defaultValidation(err, res, body);
		
		assert.equal(body.removed, 1);
		
		done();
	}
}

function deletePaymentsByIntervalId(done)
{
	var intervalId;
	
	var endpoint = host.intervals + '/latest';
	
	request.get(endpoint, onIntervalIdReceived);
	
	function onIntervalIdReceived(err, res, interval)
	{
		defaultValidation(err, res, interval);
		
		assert.property(interval, 'id');
		
		intervalId = interval.id;
		
		endpoint = util.format('%s?intervalId=%d', host.payments, intervalId);
		
		request.del(endpoint, validate);
	}
	
	function validate(err, res, body)
	{
		defaultValidation(err, res, body)
		
		assert.property(body, 'removed');
		
		assert.equal(body.removed, 15);
		
		done();
	}
}

function defaultValidation(err, res, body)
{
    assert.isNull(err);
    assert.equal(res.statusCode, 200);
}