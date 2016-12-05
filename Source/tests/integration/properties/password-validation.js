/**
 * Created by I.Denisovs on 05.12.2016
 */

var request = require('../request');
var assert = require('chai').assert;
var http = require('http-status');
var host = require('../host.json').host;

function passwordValidationTests()
{
    beforeEach(defineProperties);
    it('Password not valid', passwordNotValid);
    it('Passwords not match', passwordNotMatch);
    it('Password is too short', passwordIsTooShort);
    it('Uppercase letter missed', uppercaseLetterMissed);
    it('Number missed', numberMissed);
    it('Valid password', validPassword)
}

module.exports = passwordValidationTests;

var options = {
    url: host.properties
};

function defineProperties() {
    options.body = {
        email: 'ga5xz2@gmail.com',
        timezone: { 'timeZoneId': 20 },
        language: 'ru',
        password: {
            original: '',
            created: '',
            confirm: ''
        }
    }
}

function passwordNotValid(done) {
    options.body.password.original = 'invalidPassword';

    request.put(options, validate);

    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.INTERNAL_SERVER_ERROR);
        assert.equal(body.error, 'PROPERTIES_INVALID_PASSWORD');
        done();
    }
}

function passwordNotMatch(done) {
    options.body.password.original = 'demo1';
    options.body.password.created = 'qwerty';
    options.body.password.confirm = 'asdfgh';

    request.put(options, validate);

    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.INTERNAL_SERVER_ERROR);
        assert.equal(body.error, 'PROPERTIES_PASSWORD_NOT_MATCH');
        done();
    }
}

function passwordIsTooShort(done) {
    options.body.password.original = 'demo1';
    options.body.password.created = 'qwerty';
    options.body.password.confirm = 'qwerty';

    request.put(options, validate);

    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.INTERNAL_SERVER_ERROR);
        assert.equal(body.error, 'PROPERTIES_PASSWORD_TOO_SHORT');
        done();
    }
}

function uppercaseLetterMissed(done) {
    options.body.password.original = 'demo1';
    options.body.password.created = 'qwerty12345';
    options.body.password.confirm = 'qwerty12345';

    request.put(options, validate);

    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.INTERNAL_SERVER_ERROR);
        assert.equal(body.error, 'PROPERTIES_PASSWORD_LETTER');
        done();
    }
}

function numberMissed(done) {
    options.body.password.original = 'demo1';
    options.body.password.created = 'QwertyQwerty';
    options.body.password.confirm = 'QwertyQwerty';

    request.put(options, validate);

    function validate(err, res, body) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.INTERNAL_SERVER_ERROR);
        assert.equal(body.error, 'PROPERTIES_PASSWORD_NUMBER');
        done();
    }
}

function validPassword(done) {
    options.body.password.original = 'demo1';
    options.body.password.created = 'Qwerty12345';
    options.body.password.confirm = 'Qwerty12345';

    request.put(options, validate);

    function validate(err, res) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.OK);

        options.body.password.original = 'Qwerty12345';
        options.body.password.created = 'demo1';

        request.put(options, resetPassword);
    }

    function resetPassword(err, res) {
        assert.isNull(err);
        assert.equal(res.statusCode, http.OK);
        done();
    }
}