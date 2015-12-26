/**
 * Created by Ga5Xz2 on 24.12.2015..
 */

var moment = require('moment');
var request = require('request');
var chai = require('chai');
var assert = chai.assert;

var host = require('./host.json').host.intervals;

var interval;

var latestInterval;

module.exports = createIntervalTests;

function createIntervalTests()
{
    before(getLatestInterval);

    before(setRequestDefaults);

    beforeEach(setIntervalFields);

    it("Create interval without Start date", createIntervalWoutStart);
    it("Create interval with start date", createIntervalWithStart);
    it("Interval is not defined", sendingWithoutBody);
    it('End not set', endFieldNotSet);
    it('Check sum', sumFieldNotSet);
    it('Start and End fields delta set wrong', startEndDeltaIsNotDay);
    it('Intervals interlace', twoIntervalsDeltaIsFuckingSmall);
}

function getLatestInterval(done)
{
    var options = { url: host + '/latest' };

    request.get(options, function(err, req, body) {
        latestInterval = body;
        done();
    });
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function setIntervalFields()
{
    interval = { end: '2016-01-01', sum: 220.99 };
}

function createIntervalWoutStart(done)
{
    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.message, 'createInterval');
        done();
    });
}

function createIntervalWithStart(done)
{
    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.message, 'createInterval');
        done();
    });
}

function sendingWithoutBody(done)
{
    var options = { url: host };

    request.post(options, function(err, res, body) {
        assert.equal(res.statusCode, 400);
        done();
    });
}

function endFieldNotSet(done)
{
    delete interval.end;

    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.equal(res.statusCode, 400);
        done();
    });
}

function sumFieldNotSet(done)
{
    delete interval.sum;

    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.equal(res.statusCode, 400);
        done();
    });
}

function startEndDeltaIsNotDay(done)
{
    interval.start = interval.end;

    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.equal(res.statusCode, 400);
        done();
    });
}

function twoIntervalsDeltaIsFuckingSmall(done)
{
    var options = { url: host + '/latest' };

    request.get(options, runTest);

    function runTest(err, res, latestInterval)
    {
        assert.equal(res.statusCode, 200);
        interval.start = latestInterval.end;
        options = { url: host, body: interval };
        request.post(options, doCheck);
    }

    function doCheck(err, res, body)
    {
        assert.equal(res.statusCode, 400);
        done();
    }
}