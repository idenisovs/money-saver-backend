/**
 * Created by I. Denisovs on 20.12.2015..
 */
/**
 * Created by I. Denisovs on 20.12.2015..
 */

var chai = require('chai');
var assert = chai.assert;
var prepareData = require('./prepare-data');

// Testable module
var calculateSchedule = require('../../.././intervals/calc/calculate-schedule');
var summary;
var schedule;

module.exports = dataValidationTests;

function dataValidationTests()
{
    beforeEach(prepare);

    it('Interval is Null', intervalIsNull);
    it('Interval is not set', intervalNotSet);
    it('Spendings is Null', spendingsIsNull);
    it('Spendings is not set', spendingsNotSet);
}

function intervalIsNull()
{
    summary.interval = null;

    assert.throw(callCalculator);
}

function intervalNotSet()
{
    delete summary.interval;

    assert.throw(callCalculator);
}

function spendingsIsNull()
{
    summary.spendings = null;

    assert.throw(callCalculator);
}

function spendingsNotSet()
{
    delete summary.spendings;

    assert.throw(callCalculator);
}

function prepare()
{
    summary = prepareData();
}

function callCalculator()
{
    calculateSchedule(summary);
}