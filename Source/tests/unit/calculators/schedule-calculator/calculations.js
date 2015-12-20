/**
 * Created by Ga5Xz2 on 20.12.2015..
 */

var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();
var prepareData = require('./prepare-data');

// Testable module
var calculateSchedule = require('../../../../modules/calculators/calculate-schedule');
var summary;
var schedule;

module.exports = calculationTests;

function calculationTests()
{
    before(prepare);

    it('just test', justTest);
}

function justTest()
{
    assert.equal(true, true);
}

function prepare()
{
    summary = prepareData();
    schedule = calculateSchedule(summary);
}