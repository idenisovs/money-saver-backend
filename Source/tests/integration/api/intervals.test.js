/**
 * Created by Ga5Xz2 on 12.12.2015..
 */
var request = require('request').defaults({ json: true });
var chai = require('chai');
var assert = chai.assert;
var util = require('util');
var host = require('./host.json').host;

describe('Intervals REST API', intervalsRestTests);

function intervalsRestTests()
{
    before(createInterval);

    describe('Get intervals', require('./intervals/get-intervals'));
    describe('Create intervals', require('./intervals/create-interval'));
    describe('Delete intervals', require('./intervals/delete-interval'));

    after(removeInterval);
}


function createInterval(done)
{
    var interval = {
        start: '2015-12-01',
        end: '2015-12-31',
        sum: 123.45
    };

    var options = {
        url: host.intervals,
        body: interval
    };

    request.post(options, function() {
        done();
    });
}

function removeInterval(done)
{
    var endpoint = util.format('%s/latest', host.intervals);

    request.get(endpoint, onLatestReceived);

    function onLatestReceived(err, res, body)
    {
        endpoint = util.format('%s/%d', host.intervals, body.id);

        request.del(endpoint, onDeleteDone);
    }

    function onDeleteDone(err, res, body)
    {
        if (err)
        {
            assert.fail('There is an error occured during interval removal!');
        }

        done();
    }
}

