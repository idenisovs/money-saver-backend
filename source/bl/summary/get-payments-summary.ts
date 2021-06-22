import { Interval, Payment } from '../../shared';

const log = require('log4js').getLogger('payments-summary');
const dal = require('../../dal');

const calculateSchedule = require('./calc/calculate-schedule');
const calculatePrediction = require('./calc/calculate-prediction');
const calculateTotals = require('./calc/calculate-totals');

type SummaryQuery = {
	id: number;
	intervalId: number;
}

export function getPaymentsSummary(request: SummaryQuery, success: Function, fail: Function) {
	const summary: {
	    interval: any,
        spendings: any,
        schedule: any,
        totals: any
    } = {
		interval: null,
		spendings: null,
		schedule: null,
		totals: null
	};

	if (request.intervalId) {
		request.id = request.intervalId;

		log.debug('Requested summary of interval %d', request.id);

		dal.intervals.getById(request, getPayments);
	} else {
		log.debug('Requested summary of latest interval!');

		dal.intervals.getLatest(request, getPayments);
	}

	function getPayments(err: Error, interval: Interval) {
		if (err) {
			return fail(err);
		}

		if (!interval) {
			return fail('Interval not found!');
		}

		log.trace(interval);

		summary.interval = interval;

		request.id = interval.id;

		dal.payments.getDailySpendings(request, calculateSummary);
	}

	function calculateSummary(err: Error, payments: Payment[]) {
		if (err) {
			return fail(err);
		}

		summary.spendings = payments;

		summary.schedule = calculateSchedule(summary);

		calculatePrediction(summary);

		summary.totals = calculateTotals(summary);

		success(summary);
	}
}