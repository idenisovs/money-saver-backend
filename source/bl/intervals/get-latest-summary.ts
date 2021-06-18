import { Interval, ScheduleItem, Spending, Totals, User } from '../../shared';
import { ErrorCallback, SuccessCallback } from '../callback-types';

const dal = require('../../dal');
const calculateSchedule = require('../summary/calc/calculate-schedule');
const calculatePrediction = require('../summary/calc/calculate-prediction');
const calculateTotals = require('../summary/calc/calculate-totals');

export default function getLatestIntervalSummary(user: User, success: SuccessCallback<any>, error: ErrorCallback) {
	const result: {
		interval?: Interval,
		spendings?: Spending[],
		schedule?: ScheduleItem[],
		totals?: Totals[]
	} = {};

	const interval = { user: user };

	dal.intervals.getLatest(interval, latestInterval);

	async function latestInterval(err: Error, interval: Interval) {
		if (err) {
			return error(err);
		}

		if (!interval) {
			return success(null);
		}

		result.interval = interval;

		interval.user = user;

		dal.intervals.getCount(user.id).then((count: number) => {
			interval.single = count === 1;
			dal.payments.getDailySpendings(interval, dailySpendings);
		}).catch((err: Error) => {
			return error(err);
		});
	}

	function dailySpendings(err: Error, dailySpendings: Spending[]) {
		if (err) {
			error(err);
			return;
		}

		result.spendings = dailySpendings;

		calculate();
	}

	function calculate() {
		result.schedule = calculateSchedule(result);

		calculatePrediction(result);

		result.totals = calculateTotals(result);

		success(result);
	}
}
