/**
 * Created by Ga5Xz2 on 21.12.2015..
 */

var chai = require('chai');
var assert = chai.assert;

var summary, schedule;

var calculatePrediction = require('../../../../modules/calculators/calculate-prediction');

describe('Prediction Calculator', predictionCalculatorTests);

function predictionCalculatorTests()
{
    beforeEach(initData);

    it('Prediction field presented in Schedule item', predictionFieldPresented);
    it('Check values', checkValues);
}

function initData()
{
    summary = require('./../summary.json');

    summary.schedule.forEach(function(item){
        delete item.prediction;
    });

    calculatePrediction(summary);

    schedule = summary.schedule;
}

function predictionFieldPresented()
{
    for (var i = 0; i < schedule.length; i++)
    {
        assert.property(schedule[i], 'prediction');
    }
}

function checkValues()
{
    schedule.forEach(function(item) {
        item.prediction = round(item.prediction);
    });

    assert.equal(schedule[0].prediction, 97.47);
    assert.equal(schedule[1].prediction, 94.93);
    assert.equal(schedule[2].prediction, 92.40);
    assert.equal(schedule[3].prediction, 89.86);
    assert.equal(schedule[4].prediction, 87.33);
    assert.equal(schedule[5].prediction, 84.79);
    assert.equal(schedule[6].prediction, 82.26);
    assert.equal(schedule[7].prediction, 79.72);
    assert.equal(schedule[8].prediction, 77.19);
    assert.equal(schedule[9].prediction, 74.65);
}

function round(value)
{
    return Math.round(value * 100) / 100;
}