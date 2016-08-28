/**
 * Created by I. Denisovs on 24.12.2015..
 */
var util = require('util');
var moment = require('moment');
var log = require('log4js').getLogger('create-interval');
var getLatestInterval = require('./get-latest');
var dal = require('../../dal');

module.exports = createInterval;

function createInterval(interval, success, error)
{
    log.debug('Trying to create interval...');

    var invalidInterval = checkValidity(interval);

    if (invalidInterval)
    {
        log.error('Interval invalid, breaking!');
        return error(invalidInterval);
    }

    log.debug('Taking latest interval...');

    getLatestInterval(interval, checkInterlaceValidity, error);

    function checkInterlaceValidity(latestInterval)
    {
        log.debug('Checking interval interlace validity...');

        if (util.isUndefined(latestInterval))
        {
            log.warn('There is no previously entered interval!');

            return saveInterval();
        }

        if (util.isUndefined(interval.start))
        {
            interval.start = moment(latestInterval.end).add(1, 'days').format('YYYY-MM-DD');
        }

        var end = moment(latestInterval.end).startOf('day');
        var nextStart = moment(interval.start).startOf('day');
        var delta = nextStart.diff(end, 'days', true);

        if (delta < 1)
        {
            var message = 'Intervals should not interlace!';
            return error({ reason: 'param', message: message });
        }

        saveInterval();
    }

    function saveInterval()
    {
        log.debug('Saving interval!');

        interval.start = moment(interval.start).valueOf();
        interval.end = moment(interval.end).endOf('day').valueOf();

        dal.intervals.create(interval, done);
    }

    function done(err)
    {
        if (err)
        {
            log.error('Save failed!');

            return error(err);
        }

        interval.id = done.lastID;

        log.debug('Interval successfully saved under %d id!', interval.id);

        success(interval);
    }
}

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