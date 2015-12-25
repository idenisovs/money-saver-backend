/**
 * Created by Ga5Xz2 on 24.12.2015..
 */

var moment = require('moment');
var request = require('request');
var chai = require('chai');
var assert = chai.assert;


var host = require('./host.json').host.intervals;

var interval;

module.exports = createIntervalTests;

function createIntervalTests()
{
    before(setRequestDefaults);

    beforeEach(setIntervalFields);

    it("Just call createInterval", createInterval);
    it("Interval is not defined", sendingWithoutBody);
    it('End not set', endFieldNotSet);
    it('Check sum', sumFieldNotSet);
    it('Latest interval presented', latestIntervalPresented);
    it('Start and End fields delta set wrong', startEndDeltaIsNotDay);
    it('Start and End fields delta', startEndDeltaCorrect);
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function setIntervalFields()
{
    interval = { end: '2016-01-01', sum: 220.99 };
}

function createInterval(done)
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

function startEndDeltaCorrect(done)
{
    interval.start = moment(interval.end).subtract(1, 'days');

    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.equal(res.statusCode, 200);
        done();
    });
}

function latestIntervalPresented(done)
{
    var options = { url: host, body: interval };

    request.post(options, function(err, res, body) {
        assert.isDefined(body.latestInterval);
        assert.isDefined(body.latestInterval.sum);
        done();
    })
}