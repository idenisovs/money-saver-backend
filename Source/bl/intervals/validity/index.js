/**
 * Created by Ilya Denisov on 23.09.2016..
 */

var util = require('util');
var moment = require('moment');
var log = require('log4js').getLogger('interval-validity');

function checkValidity(interval)
{
    var result = null;

    try
    {
        checkFields(interval);
    }
    catch (err)
    {
        result = { reason: 'param', message: err.toString() };

        log.error('Interval has invalid fields! %s', result.message);
    }

    log.debug('New interval is valid!');

    return result;
}

module.exports = checkValidity;

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
        log.warn('interval.start is undefined!');

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