import { Summary, User } from '../../shared';

const dal = require('../../dal');
const calculateSchedule = require('../summary/calc/calculate-schedule');
const calculatePrediction = require('../summary/calc/calculate-prediction');
const calculateTotals = require('../summary/calc/calculate-totals');

export default async function getLatestIntervalSummary(user: User): Promise<Summary|null> {
	const latestInterval = await dal.intervals.getLatest(user);

	if (!latestInterval) {
		return null;
	}

	const interval = latestInterval;

	latestInterval.user = user;

	const count = await dal.intervals.getCount(user.id);

	latestInterval.single = count === 1;

	const spendings = dal.payments.getDailySpendings(latestInterval);

	const schedule = calculateSchedule({
		interval, spendings
	});

	calculatePrediction({
		interval, schedule
	});

	const totals = calculateTotals({
		schedule, interval
	});

	return {
		interval, schedule, totals, spendings
	} as Summary;
}
