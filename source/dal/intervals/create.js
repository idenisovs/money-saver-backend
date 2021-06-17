/**
 * Created by I.Denisovs on 26.12.2015..
 */

var log = require('log4js').getLogger('create-interval');
var db = require('./../db');

function createInterval(interval, callback)
{
    log.debug('createInterval called for user %s', interval.user.login);

    resetLatest(interval.user.id, resetDone);

    function resetDone(err)
    {
        if (err)
        {
            return done(err);
        }

        log.debug('Reset done!');

        insert(interval, done);
    }

    function done(err)
    {
        if (err)
        {
            log.error(err);
        }

        log.debug('Insert done!');

        callback.lastID = this.lastID;

        callback(err);
    }
}

module.exports = createInterval;

function resetLatest(userId, done)
{
    log.debug('Resetting latest field!');

    var sql = 'UPDATE intervals SET latest = 0 WHERE userId = $userId';

    var params = { $userId: userId };

    db.run(sql, params, done);
}

function insert(interval, done)
{
    log.debug('Inserting new interval!');

    var sql = 'INSERT INTO intervals (start, end, sum, userId, latest) VALUES ($start, $end, $sum, $userId, $latest)';

    var params =
    {
        $start: interval.start,
        $end: interval.end,
        $sum: interval.sum,
        $userId: interval.user.id,
        $latest: 1
    };

    db.run(sql, params, done);
}