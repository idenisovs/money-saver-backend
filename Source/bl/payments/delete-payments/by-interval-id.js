/**
 * This module helps to remove payments by specified interval id.
 * Created by I. Denisovs on 17.07.2017..
 */

const format = require('util').format;
const log = require('log4js').getLogger('delete-payment');
const dal = require('../../../dal');

const noIntervalMessageTemplate = 'There is no interval with such id: %d!';

function deleteByIntervalId(req, done) {
    log.debug('Removing payments by interval id!');

    var interval = { id: req.query.intervalId, user: req.user };

    dal.intervals.getById(interval, intervalRequestDone);

    function intervalRequestDone(err, interval)
    {
        if (err) {
            return done(err);
        }

        if (!interval) {
            return done({ message: format(noIntervalMessageTemplate, req.query.intervalId) });
        }

        interval.user = req.user;

        dal.payments.deleteByInterval(interval, done);
    }
}

module.exports = deleteByIntervalId;