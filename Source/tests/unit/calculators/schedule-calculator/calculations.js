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

module.exports = calculationTests;

function calculationTests()
{
    beforeEach(prepare);

    it('Sum column', sumColumn);
    it('Spendigs set properly', spendingColumn);
    it('Residuals calculated properly', residualColumn);
    it('Balance calculated properly', balanceColumn);
    it('Daily balance calculated properly', dailyBalanceColumn);
}

function sumColumn()
{
    var prevValue;

    schedule.forEach(function(item){
        if (!prevValue)
        {
            assert.equal(item.sum, summary.interval.sum);
            prevValue = item.sum;
            return;
        }

        var delta = prevValue - item.sum;
        prevValue = item.sum;

        assert.equal(delta, 10);
    });
}

function spendingColumn()
{
    assert.equal(schedule[0].spent, 0);
    assert.equal(schedule[1].spent, 7.01);
    assert.equal(schedule[2].spent, 0.99);
    assert.equal(schedule[3].spent, 0);
    assert.equal(schedule[4].spent, 5);
    assert.equal(schedule[5].spent, 2.35);
    assert.equal(schedule[6].spent, 10);
    assert.equal(schedule[7].spent, 0);
    assert.equal(schedule[8].spent, 0);
    assert.equal(schedule[9].spent, 0);
}

function residualColumn()
{
    assert.equal(schedule[0].residual, 100);
    assert.equal(schedule[1].residual, 92.99);
    assert.equal(schedule[2].residual, 92.00);
    assert.equal(schedule[3].residual, 92.00);
    assert.equal(schedule[4].residual, 87.00);
    assert.equal(schedule[5].residual, 84.65);
    assert.equal(schedule[6].residual, 74.65);
    assert.equal(schedule[7].residual, 74.65);
    assert.equal(schedule[8].residual, 74.65);
    assert.equal(schedule[9].residual, 74.65);
}

function balanceColumn()
{
    schedule.forEach(function(item) {
        item.balance = round(item.balance);
    });
    
    assert.equal(schedule[0].balance, 0);
    assert.equal(schedule[1].balance, 2.99);
    assert.equal(schedule[2].balance, 12);
    assert.equal(schedule[3].balance, 22);
    assert.equal(schedule[4].balance, 27);
    assert.equal(schedule[5].balance, 34.65);
    assert.equal(schedule[6].balance, 34.65);
    assert.equal(schedule[7].balance, 44.65);
    assert.equal(schedule[8].balance, 54.65);
    assert.equal(schedule[9].balance, 64.65);
}

function dailyBalanceColumn()
{
    schedule.forEach(function(item) {
        item.dailyBalance = round(item.dailyBalance);
    });

    assert.equal(schedule[0].dailyBalance, 10);
    assert.equal(schedule[1].dailyBalance, 2.99);
    assert.equal(schedule[2].dailyBalance, 9.01);
    assert.equal(schedule[3].dailyBalance, 10);
    assert.equal(schedule[4].dailyBalance, 5);
    assert.equal(schedule[5].dailyBalance, 7.65);
    assert.equal(schedule[6].dailyBalance, 0);
    assert.equal(schedule[7].dailyBalance, 10);
    assert.equal(schedule[8].dailyBalance, 10);
    assert.equal(schedule[9].dailyBalance, 10);
}

function round(value)
{
    return Math.round(value * 100) / 100;
}

function prepare()
{
    summary = prepareData();
    schedule = calculateSchedule(summary);
}