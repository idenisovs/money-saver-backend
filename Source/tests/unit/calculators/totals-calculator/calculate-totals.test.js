/**
 * Created by I. Denisovs on 21.12.2015..
 */

var chai = require('chai');
var assert = chai.assert;

var totals;

var calculateTotals = require('../../.././intervals/calc/calculate-totals');

describe('Totals Calculator', totalsCalculatorTests);

function totalsCalculatorTests()
{
    beforeEach(initData);

    it('Check fields presented', checkFieldsPresented);
    it('Check values', checkValues);
}

function initData()
{
    var summary = require('../summary.json');

    totals = calculateTotals(summary);

    for (var key in totals)
    {
        totals[key] = round(totals[key]);
    }
}

function checkFieldsPresented()
{
    var requiredFields = [ "days", "currentDay", "currentDayPercents", "startingSum", "expenses", "expensesPercent", "residual", "residualPercents", "expensesAvg", "incomesAvg", "expectedResidual", "expectedResidualPercents" ];

    for (var i = 0; i < requiredFields.length; i++)
    {
        assert.property(totals, requiredFields[i]);
    }
}

function checkValues()
{
    assert.equal(totals.days, 10);
    assert.equal(totals.currentDay, 10);
    assert.equal(totals.currentDayPercents, 1);
    assert.equal(totals.startingSum, 100);
    assert.equal(totals.expenses, 25.35);
    assert.equal(totals.expensesPercent, 0.25);
    assert.equal(totals.residual, 74.65);
    assert.equal(totals.residualPercents, 0.75);
    assert.equal(totals.expensesAvg, 2.54);
    assert.equal(totals.incomesAvg, 7.47);
    assert.equal(totals.expectedResidual, 74.65);
    assert.equal(totals.expectedResidualPercents, 0.75);
}

function round(value)
{
    return Math.round(value * 100) / 100;
}