/**
 * Created by Ga5Xz2 on 11.12.2015..
 */
var request = require('request');
var chai = require('chai');
var assert = chai.assert;

var host = 'http://localhost:9001/api/payments/';

describe('Payments REST API', paymentsRestTests);

function paymentsRestTests()
{
    before(setRequestDefaults);
    it('Get latest payment', stub);
}

function setRequestDefaults()
{
    request = request.defaults({json: true});
}

function stub()
{
    assert.equal(true, true);
}