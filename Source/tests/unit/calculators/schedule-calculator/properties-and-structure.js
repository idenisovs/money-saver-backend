/**
 * Created by Ga5Xz2 on 20.12.2015..
 */

var chai = require('chai');
var assert = chai.assert;
var prepareData = require('./prepare-data');

// Testable module
var calculateSchedule = require('../../../../modules/calculators/calculate-schedule');
var summary;
var schedule;

module.exports = propertiesAndStructureTests;

function propertiesAndStructureTests()
{
    beforeEach(prepare);
    it('CalculateSchedule should return array', shouldReturnArray);
    it('Returned array should have 10 records', arrayShouldHaveTenRecords);
    it('First and last dates of Schedule should belong to interval', firstAndLastItemDatesInInterval);
    it('Schedule item has all required fields', checkScheduleItemFields);
}

function prepare()
{
    summary = prepareData();
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