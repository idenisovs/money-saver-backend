/**
 * Created by Ga5Xz2 on 02.01.2016..
 */

var util = require('util');
var request = require('request').defaults({ json: true });
var host = require('../host.json').host;
var assert = require('chai').assert;
var moment = require('moment');

var payments = [
    { time: moment('2015-12-01T09:30').valueOf(), sum: 12.15 },
    { time: moment('2015-12-01T12:17').valueOf(), sum: 1.22 },
    { time: moment('2015-12-02T21:45').valueOf(), sum: 2.34 },
    { time: moment('2015-12-03T03:02').valueOf(), sum: 7.55 },
    { time: moment('2015-12-03T16:40').valueOf(), sum: 12.0 },
    { time: moment('2015-12-04T18:17').valueOf(), sum: 3.65 },
    { time: moment('2015-12-05T10:01').valueOf(), sum: 7.32 },
    { time: moment('2015-12-06T02:55').valueOf(), sum: 6.99 },
    { time: moment('2015-12-07T11:30').valueOf(), sum: 1.01 },
    { time: moment('2015-12-08T12:36').valueOf(), sum: 32.15 },
    { time: moment('2015-12-08T17:18').valueOf(), sum: 4.45 },
    { time: moment('2015-12-08T17:51').valueOf(), sum: 7.12 },
    { time: moment('2015-12-09T08:00').valueOf(), sum: 12.99 },
    { time: moment('2015-12-10T09:30').valueOf(), sum: 3.0 }
];

function createPayments(done)
{
    var options = { url: host.payments, body: payments };

    request.post(options, response);

    function response(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
}

module.exports = createPayments;