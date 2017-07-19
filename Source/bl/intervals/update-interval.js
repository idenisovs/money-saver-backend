/**
 * This module contains business logic for Interval Update operation.
 * Created by I.Denisovs on 27.08.2016
 */

const log = require('log4js').getLogger('update-interval');
const moment = require('moment');
const dal = require('../../dal');

function updateInterval(interval, success, error)
{
    log.trace(interval);

    interval.end = moment(interval.end).endOf('day').valueOf();

    dal.intervals.update(interval, done);

    function done(err) {
        if (err) {
            return error(err);
        }

        success();
    }

}

module.exports = updateInterval;