import { Interval, ScheduleItem, Spending, Totals, User } from '../../shared';
import { ErrorCallback, SuccessCallback } from '../callback-types';

const dal = require('../../dal');
const calculateSchedule = require('../summary/calc/calculate-schedule');
const calculatePrediction = require('../summary/calc/calculate-prediction');
const calculateTotals = require('../summary/calc/calculate-totals');

export default async function getLatestIntervalSummary(user: User, success: SuccessCallback<any>, error: ErrorCallback) {
	const result: {
		interval?: Interval,
		spendings?: Spending[],
		schedule?: ScheduleItem[],
		totals?: Totals[]
	} = {};

	const latestInterval = await dal.intervals.getLatest({ user: user });

	if (!latestInterval) {
		return success(null);
	}

	result.interval = latestInterval;

	latestInterval.user = user;

	dal.intervals.getCount(user.id).then((count: number) => {
		latestInterval.single = count === 1;
		dal.payments.getDailySpendings(latestInterval, dailySpendings);
	}).catch((err: Error) => {
		return error(err);
	});

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
