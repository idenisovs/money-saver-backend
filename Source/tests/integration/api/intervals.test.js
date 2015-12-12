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
    it('Get specific interval', getIntervalById);
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
        assert.equal(body.message, 'createInterval called!');
        done();
    });
}

function getIntervals(done)
{
    request.get(host, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.message, 'getIntervals called!');
        done();
    });
}

function getLatestInterval(done)
{
    var endpoint = host + 'latest';

    request.get(endpoint, function(err, res, body) {
        console.log(body);

        assert.isNull(err);

        assert.property(body, 'id');
        assert.property(body, 'start');
        assert.property(body, 'end');
        assert.property(body, 'start');
        assert.property(body, 'payments');

        assert.isAbove(body.start, 0);
        assert.isAbove(body.end, body.start);

        done();
    });
}

function getIntervalById(done)
{
    var endpoint = host + '/12345';

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.equal(body.message, 'getIntervalById called!');
        done();
    });
}