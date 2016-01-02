/**
 * Created by Ga5Xz2 on 11.12.2015..
 */
var util = require('util');
var request = require('request').defaults({ json: true });
var chai = require('chai');
var assert = chai.assert;
var host = require('./host.json').host;

describe('Payments REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(createInterval);

    describe('Get Payments', require('./payments/get-payments'));

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

    request.post(options, function(err, res, body) {
        defaultValidation(err, res, body);
        done();
    });
}

function removeInterval(done)
{
    var endpoint = util.format('%s/latest', host.intervals);

    request.get(endpoint, onLatestReceived);

    function onLatestReceived(err, res, body)
    {
        defaultValidation(err, res, body);

        endpoint = util.format('%s/%d', host.intervals, body.id);

        request.del(endpoint, onDeleteDone);
    }

    function onDeleteDone(err, res, body)
    {
        defaultValidation(err, res, body);
        done();
    }
}

function defaultValidation(err, res, body)
{
    assert.isNull(err);
    assert.equal(res.statusCode, 200);
}


