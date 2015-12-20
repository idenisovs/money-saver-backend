/**
 * Created by Ga5Xz2 on 20.12.2015..
 */
var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();

// Testable module
var calculateSchedule = require('../../../modules/calculators/calculate-schedule');
var summary;
var schedule;

describe('CalculateSchedule tests', scheduleCalculatorTests);

function scheduleCalculatorTests()
{
    beforeEach(prepareData);

    it('CalculateSchedule should return array', shouldReturnArray);
    it('Returned array should have 10 records', arrayShouldHaveTenRecords);
    it('First and last dates of Schedule should belong to interval', firstAndLastItemDatesInInterval);
    it('Schedule item has all required fields', checkScheduleItemFields);
}

function prepareData()
{
    summary =
    {
        interval: makeInterval(),
        spendings: makeSpendings()
    };

    schedule = calculateSchedule(summary);
}

function shouldReturnArray()
{
    assert.isArray(schedule, 'Returned schedule should be Array');
}

function arrayShouldHaveTenRecords()
{
    assert.equal(schedule.length, 10, 'Schedule should have 10 items')
}

function firstAndLastItemDatesInInterval()
{
    var firstDate = schedule[0].date;
    assert.equal(firstDate, '2015-12-01');

    var lastDate = schedule[schedule.length - 1].date;
    assert.equal(lastDate, '2015-12-10');
}

function checkScheduleItemFields()
{
    var idx = schedule.length / 2;
    var scheduleItem = schedule[idx];

    assert.property(scheduleItem, 'date');
    assert.property(scheduleItem, 'sum');
    assert.property(scheduleItem, 'spent');
    assert.property(scheduleItem, 'residual');
    assert.property(scheduleItem, 'balance');
    assert.property(scheduleItem, 'dailyBalance');
}

function makeInterval()
{
    var start = new Date(2015, 11, 1);
    var end = new Date(2015, 11, 10);

    return { id: 1, start: start.getTime(), end: end.getTime(), sum: 100.0 };
}

function makeSpendings()
{
    var result =
    [
        { date: '2015-12-02', sum: 7.01 },
        { date: '2015-12-02', sum: 1.15 },
        { date: '2015-12-03', sum: 0.99 },
        { date: '2015-12-04', sum: 3.00 },
        { date: '2015-12-05', sum: 2.35 },
        { date: '2015-12-05', sum: 3.65 },
        { date: '2015-12-07', sum: 10.00 }
    ];

    return result;
}