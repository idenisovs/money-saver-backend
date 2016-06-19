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

var auth;
var user;
var options;

beforeEach(setAll);

function setAll()
{
    user = { username: 'user1', password: 'test1' };
    auth = host.auth;
    options = { url: auth, body: user };
}

function loginTests()
{
    it('Wrong login, should be rejected!', wrongLogin);
    it('Wrong password, should be rejected!', wrongPassword);
    it('Wrong login and password, should be rejected!', wrongLoginPassword);
    it('Empty login and password, should be rejected!', emptyLoginAndPassword);
    it('Valid user credentials, should be accepted!', validCredentials);
}

module.exports = loginTests;

function wrongLogin(done)
{
    user.username = 'incorrect';

    request.post(options, check);

    function check(err, res, body)
    {
        assert.equal(res.statusCode, 401);
        done();
    }
}

function wrongPassword(done)
{
    user.password = 'incorrect';

    request.post(options, check);

    function check(err, res, body)
    {
        assert.equal(res.statusCode, 401);
        done();
    }
}

function wrongLoginPassword(done)
{
    user.username = 'incorrect';
    user.password = 'incorrect';

    request.post(options, check);

    function check(err, res, body)
    {
        assert.equal(res.statusCode, 401);
        done();
    }
}

function emptyLoginAndPassword(done)
{
    user.username = '';
    user.password = '';

    request.post(options, check);

    function check(err, res, body)
    {
        assert.equal(res.statusCode, 401);
        done();
    }
}

function validCredentials(done)
{
    request.post(options, check);

    function check(err, res, body)
    {
        assert.isUndefined(body);
        assert.equal(res.statusCode, 200);
        done();
    }
}