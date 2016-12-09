/**
 * Created by Ilya Denisov on 09.07.2016..
 */

var moment = require('moment');
var dal = require('../../dal');

function getYears(user, success, error)
{
    var years = [];

    dal.intervals.getAll(user, processIntervals);

    function processIntervals(err, intervals)
    {
        if (err)
        {
            return error(err);
        }

        intervals.forEach(processInterval);
    }

    function processInterval(interval, idx, list)
    {
        processTimestamp(interval.start);

        if (idx === (list.length - 1))
        {
            success(years);
        }
    }

    function processTimestamp(stamp)
    {
        var year = moment(stamp).year();

        if (years.indexOf(year) === -1)
        {
            years.push(year);
        }
    }
}

module.exports = getYears;