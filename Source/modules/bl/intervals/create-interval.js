/**
 * Created by Ga5Xz2 on 24.12.2015..
 */
var util = require('util');

module.exports = createInterval;

function createInterval(interval, success, error)
{
    try
    {
        checkParams(interval);
    }
    catch (err)
    {
        error({ reason: 'param', message: err.toString() });
        return;
    }

    success({ message: 'createInterval' });
}

function checkParams(interval)
{
    if(util.isUndefined(interval))
    {
        console.error('A');
        throw new Error('Interval object is not set!');
    }

    if(!interval.end)
    {
        console.error('B');
        throw new Error('End date is not set! Please, set `end` field properly!');
    }

    if (util.isUndefined(interval.sum) || interval.sum === null)
    {
        console.error('C');
        throw new Error('Sum is not set! Please, set `sum` field properly!');
    }
}