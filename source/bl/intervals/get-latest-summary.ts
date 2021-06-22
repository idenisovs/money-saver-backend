import { SummaryRecord, User } from '../../shared';
import dal from '../../dal';

const calculateSchedule = require('../summary/calc/calculate-schedule');
const calculatePrediction = require('../summary/calc/calculate-prediction');
const calculateTotals = require('../summary/calc/calculate-totals');

export async function getLatestIntervalSummary(user: User): Promise<SummaryRecord|null> {
	const latestInterval = await dal.intervals.getLatest(user);

	if (!latestInterval) {
		return null;
	}

	const interval = latestInterval;

	const count = await dal.intervals.getCount(user.id);

	latestInterval.single = count === 1;

	const spendings = await dal.payments.getDailySpendings(latestInterval, user);

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
	} as SummaryRecord;
}
