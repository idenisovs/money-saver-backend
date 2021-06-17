/**
 * Created by I.Denisovs on 05.12.2016
 */
var request = require('./request');
var assert = require('chai').assert;
var http = require('http-status');
var host = require('./host.json').host;
var defaultValidation = require('./helper/default-validation');

describe('Timezones REST API', timezonesRestTests);

function timezonesRestTests()
{
	beforeEach(resetOptions);
	
    it('Get all timezones', getAll);
	it('Get timezone by id', getById);
	it('Get timezone with invalid id', getInvalidId);
}

var options;

function resetOptions() {
	options = {
		url: host.timezones
	}	
}

function getAll(done) {
	request.get(options, defaultValidation(validate));
	
	function validate(timezones) {
		assert.isArray(timezones);
		assert.equal(timezones.length, 82);
		done();
	}
}

function getById(done) {
	options.url += '/41'
	
	request.get(options, defaultValidation(validate));
	
	function validate(timezone) {
		assert.isObject(timezone);
		
		assert.equal(timezone.useDaylightTime, "1");
		assert.equal(timezone.value, "2");
		assert.equal(timezone.gmtAdjustment, "GMT+02:00");
		assert.equal(timezone.label, "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius");
		
		done();
	}
}

function getInvalidId(done) {
	options.url += '/666'
	
	request.get(options, validate);
	
	function validate(err, res, error) {
		assert.equal(res.statusCode, http.NOT_FOUND);
		assert.equal(error.error, 'TIMEZONE_NOT_FOUND');
		done();
	}
}