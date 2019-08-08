/**
 * Created by I.Denisovs on 16.3.7.
 */

var log = require('log4js').getLogger('payments-summary');
var format = require('util').format;
var dal = require('../../dal');

var calculateSchedule = require('./calc/calculate-schedule');
var calculatePrediction = require('./calc/calculate-prediction');
var calculateTotals = require('./calc/calculate-totals');

function getPaymentsSummary(request, success, fail)
{
    var summary =
    {
        interval: null,
        spendings: null,
        schedule: null,
        totals: null
    };

    if (request.intervalId)
    {
        request.id = request.intervalId;

        log.debug('Requested summary of interval %d', request.id);

        dal.intervals.getById(request, getPayments);
    }
    else
    {
        log.debug('Requested summary of latest interval!');

        dal.intervals.getLatest(request, getPayments);
    }

    function getPayments(err, interval)
    {
        if (err)
        {
            return fail(err);
        }

        if (!interval)
        {
            return fail('Interval not found!');
        }

        log.trace(interval);

        interval.latest = interval.latest === 1;

        summary.interval = interval;

        request.id = interval.id;

        dal.payments.getDailySpendings(request, calculateSummary);
    }

    function calculateSummary(err, payments)
    {
        if (err)
        {
            return fail(err);
        }

        summary.spendings = payments;

        summary.schedule = calculateSchedule(summary);

        calculatePrediction(summary);

        summary.totals = calculateTotals(summary);

        success(summary);
    }
}

module.exports = getPaymentsSummary;
