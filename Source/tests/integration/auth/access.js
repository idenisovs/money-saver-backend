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
var intervals = host.intervals + '/latest';

beforeEach(setAll);

function setAll()
{
    clearCookies();

    user = { username: 'user1', password: 'test1' };
    options = { url: login, body: user };
}

function clearCookies()
{
    jar = request.jar();
}

function accessTests()
{
    it('Anonymous access, should be rejected!', anonymousAccessRejected);
    it('Login and get intervals, should be accepted!', authenticatedIntervalsAccepted);
    it('After logout API should not be accessed!', afterLogoutRejected);
}

module.exports = accessTests;

function anonymousAccessRejected(done)
{
    request.get(intervals, check);

    function check(err, res, body)
    {
        assert.equal(res.statusCode, 401);
        done();
    }
}

function authenticatedIntervalsAccepted(done)
{
    request.post(options, onLogin);

    function onLogin(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        request.get(intervals, check);
    }

    function check(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 204);
        done();
    }
}

function afterLogoutRejected(done)
{
    request.post(options, onLogin);

    function onLogin(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        request.get(intervals, takeIntervals);
    }

    function takeIntervals(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 204);

        request.get(logout, onLogout);
    }

    function onLogout(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 200);

        request.get(intervals, check);
    }

    function check(err, res, body)
    {
        assert.isNull(err);
        assert.equal(res.statusCode, 401);

        done();
    }
}