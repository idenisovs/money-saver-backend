/**
 * Created by I. Denisovs on 09.12.2015..
 */
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var assert = chai.assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();

// Dependencies
var db = require('../../.././db');

// Testable module
var savePayment;

// Spies
var dbSpy;

describe('save-payment', paymentsModuleTests);

function paymentsModuleTests()
{
    //beforeEach(prepareSpy);
    //
    //it('Promise resolved', testingPromise);
    //it('db.test() is called', testingSinonSpy);
}

function prepareSpy()
{
    dbSpy = { '@runtimeGlobal': true };

    dbSpy.test = sinon.spy();

    var deps = { './../db': dbSpy };

    savePayment = proxyquire('../../../../modules/dal/payments/save-payment', deps);
}

function testingPromise()
{
    var payment = {};

    var q = savePayment(payment);

    return assert.isFulfilled(q);
}

function testingSinonSpy()
{
    var p = {};

    return savePayment(p).then(function(){
        assert.isTrue(dbSpy.test.calledOnce);
    });
}