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

module.exports = deleteIntervalTests;

function deleteIntervalTests()
{
    before(setRequestDefaults);
    before(getLatestInterval);
    beforeEach(setIntervalFields);

    it('Delete existing interval', deleteInterval);
    it('Delete unexisting interval', deleteUnexisting);
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
    interval = { sum: 123.45 };
}

function deleteInterval(done)
{
    var end = moment(latestInterval.end);

    interval.start = end.add(1, 'days').format('YYYY-MM-DD');
    interval.end = end.add(15, 'days').format('YYYY-MM-DD');

    var options = { url: host, body: interval };

    request.post(options, onIntervalCreateSuccess);

    function onIntervalCreateSuccess(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        options = { url: host + '/' + body.newInterval.id };

        request.del(options, runChecks);

    }

    function runChecks(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
}

function deleteUnexisting(done)
{
    var options = { url: host + '/' + 1234567890 };

    request.del(options, function(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    });
}