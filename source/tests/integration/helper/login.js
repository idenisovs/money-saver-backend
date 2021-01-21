/**
 * Created by I.Denisovs on 16.19.6.
 */

var assert = require('chai').assert;
var request = require('../request');
var host = require('../host.json').host;

function login(done)
{
    var user =
    {
        username: 'user1',
        password: 'demo1'
    };

    var options =
    {
        url: host.auth,
        body: user
    };

    request.post(options, check);

    function check(err, res)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);
        done();
    }
}

module.exports = login;