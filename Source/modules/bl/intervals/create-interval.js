/**
 * Created by Ga5Xz2 on 24.12.2015..
 */
var util = require('util');
var moment = require('moment');
var getLatestInterval = require('./get-latest');

module.exports = createInterval;

function createInterval(interval, success, error)
{
    var invalidInterval = checkValidity(interval);

    if (invalidInterval)
    {
        error(invalidInterval);
        return;
    }

    getLatestInterval(checkInterlaceValidity, error);

    function checkInterlaceValidity(latestInterval)
    {
        if (util.isUndefined(interval.start))
        {
            interval.start = moment(latestInterval.end).add(1, 'days').format('YYYY-MM-DD');
        }

        var end = moment(latestInterval.end).startOf('day');
        console.log('End: %s', end.format('YYYY-MM-DD'));

        var nextStart = moment(interval.start).startOf('day');
        console.log('Start: %s', nextStart.format('YYYY-MM-DD'));

        var delta = nextStart.diff(end, 'days', true);
        console.log('Delta: %d', delta);

        if (delta < 1)
        {
            var message = 'Intervals should not interlace!';
            error({ reason: 'params', message: message });
            return;
        }

        success({ message: 'createInterval', latestInterval: latestInterval, newInterval: interval });
    }
}

function checkValidity(interval)
{
    var result;

    try
    {
        checkFields(interval);
    }
    catch (err)
    {
        result = { reason: 'param', message: err.toString() };
    }

    return result;
}

function checkFields(interval)
{
    if(util.isUndefined(interval))
    {
        throw new Error('Interval object is not set!');
    }

    if(isUndefined(interval.end))
    {
        throw new Error('End date is not set! Please, set `end` field properly!');
    }

    if (isUndefined(interval.sum))
    {
        throw new Error('Sum is not set! Please, set `sum` field properly!');
    }


    if (isUndefined(interval.start))
    {
        return;
    }

    var delta = moment(interval.end).diff(interval.start, 'days', true);

    if (delta < 1)
    {
        throw new Error('Interval between Start and End dates is smaller than 1 day.');
    }

}

function isUndefined(value)
{
    return (util.isUndefined(value) || value === null);
}