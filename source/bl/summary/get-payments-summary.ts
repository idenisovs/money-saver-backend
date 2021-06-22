import { SummaryRecord, User } from '../../shared';
import log4js from 'log4js';
import dal from '../../dal';

import calculateTotals from './calc/calculate-totals';
import calculatePrediction from './calc/calculate-prediction';
import calculateSchedule from './calc/calculate-schedule';
import getInterval from './get-interval';
import ItemNotFoundError from '../../support/errors/item-not-found';

const log = log4js.getLogger('payments-summary');

export async function getPaymentsSummary(intervalId: number, user: User): Promise<SummaryRecord> {
	const interval = await getInterval(intervalId, user);

	log.trace(interval);

	if (!interval) {
		throw new ItemNotFoundError('Interval not found!');
	}

	const spendings = await dal.payments.getDailySpendings(interval, user);

	const schedule = calculateSchedule(interval, spendings);

	const totals = calculateTotals(schedule, interval);

	calculatePrediction(interval, schedule);

	return {
		interval,
		spendings,
		schedule,
		totals
	}
}