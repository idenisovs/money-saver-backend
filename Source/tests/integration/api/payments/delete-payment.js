/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var util = require('util');
var request = require('request').defaults({ json: true });
var assert = require('chai').assert;
var host = require('../host.json').host;

function deletePaymentTests()
{
    it('Just test', justTest);
}

module.exports = deletePaymentTests;

function justTest(done)
{
    assert.equal(true, true);

    done();
}

function defaultValidation(err, res, body)
{
    assert.isNull(err);
    assert.equal(res.statusCode, 200);
}