/**
 * Created by Ga5Xz2 on 12.12.2015..
 */
var request = require('request');
var chai = require('chai');
var assert = chai.assert;

var host = 'http://localhost:9001/api/intervals/';

describe('Intervals REST API', intervalsRestTests);

function intervalsRestTests()
{
    before(setRequestDefaults);
    it('Create interval', createInterval);
    it('Get intervals', getIntervals);
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

function getIntervals(done)
{
    request.get(host, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.message, 'getIntervals');
        done();
    });
}

function getLatestInterval(done)
{
    var endpoint = host + 'latest';

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.message, 'getLatestInterval');
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