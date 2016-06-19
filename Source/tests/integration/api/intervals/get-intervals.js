/**
 * Created by Ga5Xz2 on 15.12.2015..
 */
var util = require('util');
var request = require('../request');
var moment = require('moment');
var chai = require('chai');
var assert = chai.assert;

var helper = require('../helper/helper');

function getIntervalsTests()
{
    it('Get latest interval', getLatestInterval);
    it('Get interval by ID', getIntervalById);
    it('getIntervals endpoint available', getIntervalsAvailable);
    it('Setting From and Till query params', getIntervalsFromAndTill);
	it('Get latest interval if no intervals in base', getUndefinedInterval);
}

module.exports = getIntervalsTests;

var host = require('./../host.json').host.intervals;

function getLatestInterval(done)
{
    var endpoint = host + '/latest';

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);

        assert.property(body, 'id');
        assert.property(body, 'start');
        assert.property(body, 'end');
        assert.property(body, 'sum');

        assert.isAbove(body.start, 0);
        assert.isAbove(body.end, body.start);

        done();
    });
}

function getIntervalById(done)
{
    var endpoint = host + '/latest';

    request.get(endpoint, onLatestReceived);

    function onLatestReceived(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        endpoint = host + '/' + body.id;
        request.get(endpoint, validate);
    }

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        assert.property(body, 'id');
        assert.property(body, 'start');
        assert.property(body, 'end');
        assert.property(body, 'sum');
        done();
    }
}

function getIntervalsAvailable(done)
{
    request.get(host, validate);
	
	function validate(err, res, body)
	{
		assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
	}
}

function getIntervalsFromAndTill(done)
{
    var expected = 
	{
        from: '2001-01-01',
        till: '2016-01-01'
    };

    var endpoint = util.format('%s/?from=%s&till=%s', host, expected.from, expected.till);

    request.get(endpoint, validate);
	
	function validate(err, res, intervals)
	{
		assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        
		assert.isArray(intervals);
		
		var interval = intervals[0];
		
		assert.property(interval, 'id');
		assert.property(interval, 'start');
		assert.property(interval, 'end');
		assert.property(interval, 'sum');
		
		done();
	}
}

function getUndefinedInterval(done)
{
	request.get(host + '/latest', deleteInterval);
	
	function deleteInterval(err, res, interval)
	{
		assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
		assert.isNumber(interval.id);
			
		request.del(host + '/' + interval.id, tryToGetLatest);
	}
	
	function tryToGetLatest(err, res, body)
	{
		assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
		assert.equal(body.intervalsRemoved, 1);
		
		request.get(host + '/latest', validate);
	}
	
	function validate(err, res, body)
	{
		assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
		
		helper.createInterval(done);
	}
}