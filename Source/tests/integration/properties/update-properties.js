/**
 * Created by I.Denisovs on 05.12.2016
 */

var request = require('../request');
var assert = require('chai').assert;
var http = require('http-status');
var host = require('../host.json').host;
var defaultValidation = require('../helper/default-validation');

function updatePropertiesTests()
{
    beforeEach(defineProperties);

    it('Set options without password', optionsWithoutPassword);
    it('Set options with password', optionsWithPassword);
}

module.exports = updatePropertiesTests;

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

function optionsWithoutPassword(done) {
    delete options.body.password;

    options.body.email = 'abc@def.org';
    options.body.language = 'lv';
    options.body.timezone.timeZoneId = 11;

    request.put(options, defaultValidation(retreive));

    function retreive() {
        request.get(host.properties, defaultValidation(validate));
    }

    function validate(properties) {
        assert.equal(properties.email, options.body.email);
        assert.equal(properties.language, options.body.language);
        assert.equal(properties.timezone, options.body.timezone.timeZoneId);
        done();
    }
}

function optionsWithPassword(done) {

    options.body.email = 'qqq@www.org';
    options.body.language = 'ru';
    options.body.timezone.timeZoneId = 21;
    options.body.password.original = 'demo1';
    options.body.password.created = 'Qwerty12345';
    options.body.password.confirm = 'Qwerty12345';

    request.put(options, defaultValidation(retreive));

    function retreive() {
        request.get(host.properties, defaultValidation(validate));
    }

    function validate(properties) {
        assert.equal(properties.email, options.body.email);
        assert.equal(properties.language, options.body.language);
        assert.equal(properties.timezone, options.body.timezone.timeZoneId);

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