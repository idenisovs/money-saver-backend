/**
 * Created by Ga5Xz2 on 15.12.2015..
 */
var util = require('util');
var request = require('request').defaults({json: true});
var chai = require('chai');
var assert = chai.assert;

function getIntervalsTests()
{
    it('Get latest interval', getLatestInterval);
    it('Get interval by ID', getIntervalById);
    it('getIntervals endpoint available', getIntervalsAvailable);
    it('Setting From and Till query params', getIntervalsFromAndTill);
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
    request.get(host, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.message, 'getIntervalsAvailable');
        done();
    });
}

function getIntervalsFromAndTill()
{
    var expected = {
        from: '2001-01-01',
        till: '2016-01-01'
    };

    var endpoint = util.format('%s/?from=%s&till=%s', host, expected.from, expected.till);

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.from, expected.from);
        assert.equal(body.till, expected.till);
    });
}