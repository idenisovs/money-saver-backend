/**
 * Created by Ga5Xz2 on 15.12.2015..
 */

var request = require('request').defaults({json: true});
var chai = require('chai');
var assert = chai.assert;

function getIntervalsTests()
{
    it('getIntervals endpoint available', getIntervalsAvailable);
    it('Setting From and Till query params', getIntervalsFromAndTill);
}

module.exports = getIntervalsTests;

var host = require('./host.json').host.intervals + '/';

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

    var endpoint = host + "?from=" + expected.from + "&till=" + expected.till;

    request.get(endpoint, function(err, res, body) {
        assert.isNull(err);
        assert.notEqual(res.statusCode, 404);
        assert.equal(body.from, expected.from);
        assert.equal(body.till, expected.till);
    });
}