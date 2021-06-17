const log = require('log4js').getLogger('payments-summary');
const dal = require('../../dal');

const calculateSchedule = require('./calc/calculate-schedule');
const calculatePrediction = require('./calc/calculate-prediction');
const calculateTotals = require('./calc/calculate-totals');

function getPaymentsSummary(request, success, fail)
{
    const summary =
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
