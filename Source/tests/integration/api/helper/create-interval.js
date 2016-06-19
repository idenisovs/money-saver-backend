/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var assert = require('chai').assert;
var request = require('../request');
var host = require('../host.json').host;

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

    request.post(options, validate);

    function validate(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
}

module.exports = createInterval;