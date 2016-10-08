/**
 * Created by Ilya Denisov on 09.10.2016..
 */

var request = require('../request');
var host = require('../host.json').host;

function clearIntervals(done) {
    request.get(host.intervals, processIntervals);

    function processIntervals(err, res, intervals) {

        if (!intervals || !intervals.length) {
            return done();
        }

        removeNext();

        function removeNext() {

            var interval = intervals.pop();

            if (!interval) {
                return done();
            }

            removeInterval(interval, removeNext);
        }
    }
}

module.exports = clearIntervals;

function removeInterval(interval, done) {

    var url = host.intervals + '/' + interval.id;

    request.delete(url, removeResult);

    function removeResult(err, res) {
        if (err) {
            return done(err);
        }

        if (res.statusCode >= 400) {
            return done(res.statusCode);
        }

        done();
    }
}