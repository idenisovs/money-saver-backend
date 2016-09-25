/**
 * This module contains business logic for Interval Update operation.
 * Created by I.Denisovs on 27.08.2016
 */

var log = require('log4js').getLogger('update-interval');
var moment = require('moment');
var dal = require('../../dal');
var checkValidity = require('./validity');

function updateInterval(interval, success, error)
{
    log.trace(interval);

    var isInvalid = checkValidity(interval);

    if (isInvalid)
    {
        return done(isInvalid);
    }

    interval.end = moment(interval.end).endOf('day').valueOf();

    dal.intervals.update(interval, done);

    function done(err)
    {
        if (err)
        {
            log.error(err);

            return error(err);
        }

        success();
    }

}

module.exports = updateInterval;