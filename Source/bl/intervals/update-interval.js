/**
 * This module contains business logic for Interval Update operation.
 * Created by I.Denisovs on 27.08.2016
 */

var log = require('log4js').getLogger('update-interval');
var dal = require('../../dal');

function updateInterval(interval, success, error)
{
    log.trace(interval);

    dal.intervals.update(interval, done);

    function done(err)
    {
        if (err)
        {
            return error(err);
        }

        success();
    }

}

module.exports = updateInterval;