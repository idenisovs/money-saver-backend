/**
 * Created by I. Denisovs on 24.12.2015..
 */

var moment = require('moment');
var request = require('../../request');
var assert = require('chai').assert;
var host = require('./../../host.json').host.intervals;
var getLatestInterval = require('./get-latest-interval');
var helper = require('../../helper/helper');

var interval;

var latestInterval;

module.exports = createIntervalTests;

function createIntervalTests()
{
    before(refreshLatestInterval);

    before(setRequestDefaults);

    beforeEach(setIntervalFields);

    it("Create interval without Start date", createIntervalWoutStart);
    it("Create interval with start date", createIntervalWithStart);
    it("Interval is not defined", sendingWithoutBody);
    it('End not set', endFieldNotSet);
    it('Check sum', sumFieldNotSet);
    it('Start and End fields delta set wrong', startEndDeltaIsNotDay);

    describe('Interlacing', interlacingTests);
}

function interlacingTests() {
    before(prepareIntervalTests);

    it('Create interval inside of latest interval', createInsideLatest);
    it('Create interval inside, start day is not the same day as today', createInsideStartDayFailure);
    it('Create interval before the latest', createIntervalBeforeLatest);
}

function refreshLatestInterval(done) {
    getLatestInterval(function (interval) {
        latestInterval = interval;
        done();
    })
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function setIntervalFields()
{
    var end = moment(latestInterval.end).add(16, 'days').format('YYYY-MM-DD');

    interval = { end: end, sum: 543.21 };
}

function createIntervalWoutStart(done)
{
    var options = { url: host, body: interval };

    request.post(options, validate);

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        assert.property(body, 'id');
        assert.isNumber(body.id);

        assert.property(body, 'start');
        assert.isNumber(body.start);

        assert.property(body, 'end');
        assert.isNumber(body.end);

        assert.property(body, 'sum');
        assert.isNumber(body.sum);

        options = { url: host + '/' + body.id };

        request.delete(options, complete);
    }

    function complete(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        done();
    }
}

function createIntervalWithStart(done)
{
    var end = moment(latestInterval.end);

    interval.start = end.add(1, 'days').format('YYYY-MM-DD');
    interval.end = end.add(15, 'days').format('YYYY-MM-DD');

    var options = { url: host, body: interval };

    request.post(options, validate);

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        assert.property(body, 'id');
        assert.isNumber(body.id);

        assert.property(body, 'start');
        assert.isNumber(body.start);

        assert.property(body, 'end');
        assert.isNumber(body.end);

        assert.property(body, 'sum');
        assert.isNumber(body.sum);

        options = { url: host + '/' + body.id };

        request.delete(options, complete);
    }

    function complete(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
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

function createInsideLatest(done) {

    var today = Date.now();

    var expected = {
        start: moment(today).startOf('day').valueOf(),
        end: moment(today).add(14, 'days').endOf('day').valueOf(),
        sum: 222.23
    };

    interval = {
        start: expected.start,
        end: expected.end,
        sum: expected.sum
    };

    var options = { url: host, body: interval };

    request.post(options, defaultValidation(getLatest));

    function getLatest() {
        getLatestInterval(validate);
    }

    function validate(lastInterval) {
        assert.equal(lastInterval.start, expected.start);
        assert.equal(lastInterval.end, expected.end);
        assert.equal(lastInterval.sum, expected.sum);
        done();
    }
}

function createInsideStartDayFailure(done) {

    var today = Date.now();

    interval = {
        start: moment(today).subtract(1, 'days').valueOf(),
        end:  moment(today).add(14, 'days').valueOf(),
        sum: 232.32
    };

    var options = { url: host, body: interval };

    request.post(options, validate);

    function validate(err, res) {
        assert.equal(res.statusCode, 500);
        done();
    }
}

function createIntervalBeforeLatest(done) {

    var today = Date.now();

    interval = {
        start: moment(today).subtract(10, 'days').valueOf(),
        end: moment(today).add(10, 'days').valueOf(),
        sum: 543.21
    };

    var options = { url: host, body: interval };

    request.post(options, validate);

    function validate(err, res) {
        assert.equal(res.statusCode, 500);
        done();
    }
}

function defaultValidation(callback) {

    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, 200, JSON.stringify(body));
        callback(body);
    }

    return validate;
}

function prepareIntervalTests(done) {

    helper.clearIntervals(createValidLatest);

    function createValidLatest() {

        var today = Date.now();

        interval = {
            start: moment(today).subtract(7, 'days').valueOf(),
            end: moment(today).add(7, 'days').valueOf(),
            sum: 123.45
        };

        var options = { url: host, body: interval };

        request.post(options, defaultValidation(validationPassed));
    }

    function validationPassed() {
        done();
    }
}