/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var util = require('util');
var request = require('request').defaults({ json: true });
var host = require('../host.json').host;
var assert = require('chai').assert;

function deleteInterval(done)
{
    var endpoint = util.format('%s/latest', host.intervals);

    request.get(endpoint, onLatestReceived);

    function onLatestReceived(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        endpoint = util.format('%s/%d', host.intervals, body.id);
        request.del(endpoint, onDeleteDone);
    }

    function onDeleteDone(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
}

module.exports = deleteInterval;