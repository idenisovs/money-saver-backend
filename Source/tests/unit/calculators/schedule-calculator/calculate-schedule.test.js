/**
 * Created by Ga5Xz2 on 20.12.2015..
 */

describe('Schedule Calculator', scheduleCalculatorTests);

function scheduleCalculatorTests()
{
    describe('Properties and structure tests', require('./properties-and-structure'));
    describe('Calculation tests', require('./calculations'));
    describe('Data validation tests', require('./data-validation'));
}