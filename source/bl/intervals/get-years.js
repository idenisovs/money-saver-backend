/**
 * This function takes list of years from list of stored intervals.
 *
 * Created by Ilya Denisov on 09.07.2016.
 */

var moment = require('moment');
var dal = require('../../dal');

function getYears(user, success, error) {
    var years = [];

    dal.intervals.getAll(user, processIntervals);

    function processIntervals(err, intervals) {
        if (err) {
            return error(err);
        }

        intervals.forEach(extractYears);

        success(years);
    }

    function extractYears(interval) {
        var year = moment(interval.start).year();

        if (years.indexOf(year) === -1) {
            years.push(year);
        }
    }
}

module.exports = getYears;