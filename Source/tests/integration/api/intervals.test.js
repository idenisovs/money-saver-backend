/**
 * Created by Ga5Xz2 on 12.12.2015..
 */
var request = require('request');
var chai = require('chai');
var assert = chai.assert;

var host = require('./host.json').host.intervals;

describe('Intervals REST API', intervalsRestTests);

function intervalsRestTests()
{
    before(setRequestDefaults);

    describe('getIntervalsAvailable', require('./getIntervals'));

    it('Create interval', createInterval);
    it('Get latest interval', getLatestInterval);
    it('Get interval by id', getIntervalById);
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function createInterval(done)
{
    var options = {
        url: host,
        body: { payment: '#00001' }
    };

    request.post(options, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.message, 'createInterval');
        done();
    });
}

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
    var expectedId = 12345;
    var endpoint = host + '/' + expectedId;

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.message, 'getIntervalById');
        assert.equal(body.intervalId, expectedId);
        done();
    });
}