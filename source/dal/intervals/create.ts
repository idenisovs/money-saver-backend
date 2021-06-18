import log4js from 'log4js';
// @ts-ignore
import db from '../db';
import { Interval } from '../../shared';

const log = log4js.getLogger('create-interval');

type IntervalCreateCallback = (err: Error|null, intervalId?: number) => void;

export default function createInterval(interval: Interval, callback: IntervalCreateCallback) {
    log.debug('createInterval called for user %s', interval.user.login);

    resetLatest(interval.user.id, resetDone);

    function resetDone(err: Error) {
        if (err) {
            return done(err);
        }

        log.debug('Reset done!');

        insert(interval, done);
    }

    function done(err: Error) {
        if (err) {
            log.error(err);
        }

        log.debug('Insert done!');

        callback(err);
    }
}

module.exports = createInterval;

function resetLatest(userId: number, done: (err: Error) => void) {
    log.debug('Resetting latest field!');

    const sql = 'UPDATE intervals SET latest = 0 WHERE userId = $userId';

    const params = { $userId: userId };

    db.run(sql, params, done);
}

function insert(interval: Interval, done: (err: Error) => void) {
    log.debug('Inserting new interval!');

    const sql = 'INSERT INTO intervals (start, end, sum, userId, latest) VALUES ($start, $end, $sum, $userId, $latest)';

    const params = {
        $start: interval.start,
        $end: interval.end,
        $sum: interval.sum,
        $userId: interval.user.id,
        $latest: 1
    };

    db.run(sql, params, done);
}