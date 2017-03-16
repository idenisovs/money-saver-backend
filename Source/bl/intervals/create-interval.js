/**
 * Create-Interval workflow module.
 *
 * Created by I. Denisovs on 24.12.2015..
 */
var util = require('util');
var format = util.format;
var moment = require('moment');
var log = require('log4js').getLogger('create-interval');
var updateInterval = require('./update-interval');
var dal = require('../../dal');
var checkValidity = require('./validity');

module.exports = createInterval;

function createInterval(interval, success, error)
{
    log.debug('Trying to create interval...');

    var invalidInterval = checkValidity(interval);

    if (invalidInterval) {
        log.error('Interval invalid, breaking!');
        return error(invalidInterval);
    }

    interval.start = moment(interval.start).valueOf();
    interval.end = moment(interval.end).endOf('day').valueOf();

    log.debug('Taking latest interval...');

    dal.intervals.getLatest(interval, checkIntervalPosition);

    function checkIntervalPosition(err, latestInterval) {
        if (err) {
            return error(err);
        }

        if (!latestInterval) {
            return saveInterval();
        }

        if (interval.start <= latestInterval.start) {
            var newInt = getDate(interval.start);
            var latInt = getDate(latestInterval.start);
            var pattern = 'New interval should not be set (%s) before latest (%s)!';
            var message = format(pattern, newInt, latInt);
            return error(message);
        }

        if (interval.start < latestInterval.end) {

            var latestIntervalEnd = getDate(latestInterval.end);
            var today = moment().format('YYYY-MM-DD');
            var requested = getDate(interval.start);

            var pattern = 'Latest interval end: %s, Today: %s, Requested start: %s.';
            log.warn(pattern, latestIntervalEnd, today, requested);

            var delta = -moment().diff(interval.start, 'days');

            if (delta < 0) {
                return error('If intervals interlace, then new interval shall be started today or later!');
            }
        }

        latestInterval.user = interval.user;

        latestInterval.end = moment(interval.start).subtract(1, 'days').valueOf();

        updateInterval(latestInterval, saveInterval, error);
    }

    function saveInterval()
    {
        log.debug('Saving interval!');

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

function getDate(timestamp) {
    return moment(timestamp).format('YYYY-MM-DD');
}