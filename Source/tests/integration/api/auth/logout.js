/**
 * Created by I.Denisovs on 16.19.6.
 */

var chai = require('chai');
var util = require('util');
var request = require('request');

var jar = request.jar();
request = request.defaults({ json: true, jar: jar, followAllRedirects: true });

var assert = chai.assert;
var host = require('../host.json').host;

var user, options;

var login = host.auth;
var logout = host.auth + '/logout';

beforeEach(setAll);

function setAll()
{
    user = { username: 'user1', password: 'test1' };
    options = { url: login, body: user };
}

function loginTests()
{
    it('Logout as anonymous user, should be rejected!', anonymousLogout);
}

module.exports = loginTests;

function anonymousLogout(done)
{
    request.get(logout, check);

    function check(err, res, body)
    {
        assert.equal(res.statusCode, 401);
        done();
    }
}