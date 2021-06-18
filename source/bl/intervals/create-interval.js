const util = require('util');
const format = util.format;
const moment = require('moment');
const log = require('log4js');
const updateInterval = require('./update-interval');
const dal = require('../../dal');

const interlaceError = 'New interval should not be set (%s) before latest (%s)!';
const latestIntervalEndWarning = 'Latest interval end: %s, Today: %s, Requested start: %s.';
const intervalShallStartedTodayMessage = 'If intervals interlace, then new interval shall be started today or later!';

module.exports = createInterval;

function createInterval(interval, success, error)
{
    log.debug('Trying to create interval...');

    interval.start = moment(interval.start).startOf('day').valueOf();
    interval.end = moment(interval.end).endOf('day').valueOf();

    log.debug('Taking latest interval...');

    dal.intervals.getLatest(interval, checkIntervalPosition);

    function checkIntervalPosition(err, latestInterval) {
        if (err) {
            return error(err);
        }

        if (!latestInterval) {
            return saveNewInterval();
        }

        if (interval.start <= latestInterval.start) {
            return interlaceErrorMessage(latestInterval);
        }

        if (interval.start < latestInterval.end) {
            return updateCurrentInterval(latestInterval);
        }

        saveNewInterval();
    }

    function interlaceErrorMessage(latestInterval) {
        const newInt = getDate(interval.start);
        const latInt = getDate(latestInterval.start);
        const message = format(interlaceError, newInt, latInt);
        error(message);
    }

    function updateCurrentInterval(latestInterval) {
        const latestIntervalEnd = getDate(latestInterval.end);
        const today = moment().format('YYYY-MM-DD');
        const requested = getDate(interval.start);

        log.warn(latestIntervalEndWarning, latestIntervalEnd, today, requested);

        const delta = -moment().diff(interval.start, 'days');

        if (delta < 0) {
            return error(intervalShallStartedTodayMessage);
        }

        latestInterval.end = moment(interval.start).subtract(1, 'days').valueOf();
        latestInterval.user = interval.user;

        updateInterval(latestInterval, saveNewInterval, error);
    }

    function saveNewInterval() {
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