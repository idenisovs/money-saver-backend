/**
 * Created by Ga5Xz2 on 02.01.2016..
 */
var util = require('util');
var request = require('request').defaults({json: true});
var chai = require('chai');
var assert = chai.assert;

function getPaymentsTests()
{
    it('test', test);
}

module.exports = getPaymentsTests;

function test()
{
    assert.equal(true, true);
}

function defaultValidation(err, res, body)
{
    assert.isNull(err);
    assert.equal(res.statusCode, 200);
}