/**
 * This module contains business logic, which helps to decide the proper method for Payments removal.
 * Created by I. Denisovs on 31.12.2015..
 */

const deleteByInterval = require('./by-interval');
const deleteById = require('./by-id');
const deleteByIntervalId = require('./by-interval-id');

const noValidDataMessage = 'No valid data specified! Payments table is not affected!';

function deletePayments(req, success, error)
{
    if (req.query.from && req.query.till) {
        return deleteByInterval(req, done);
    }

    if (req.query.id) {
        return deleteById(req, done);
    }

    if (req.query.intervalId) {
        return deleteByIntervalId(req, done);
    }

    return error({ reason: 'params', message: noValidDataMessage });

    function done(err, removed) {
        if (err) {
            return error(err);
        }

        success(removed);
    }
}

module.exports = deletePayments;