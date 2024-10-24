import log4js from 'log4js';
import dal from '../../dal';
import { Payment, User } from '../../shared';

const log = log4js.getLogger('get-payments');

type PaymentsRequest = {
	id?: number;
	date?: string;
	from?: string;
	till?: string;
};

export async function getPayments(query: PaymentsRequest, user: User): Promise<Payment[]> {
	log.trace(query);

	if ('id' in query) {
		log.debug('Taking payment by id <%s>!', query.id);
		return [await dal.payments.getById(query.id!, user)];
	}

	if ('date' in query) {
		log.debug('Taking payments by date <%s>!', query.date);
		return await dal.payments.getByDate(query.date!, user);
	}

	if (('from' in query) && ('till' in query)) {
		log.debug('Taking payments by date range!');

		const paymentRequest = {
			from: query.from as string,
			till: query.till as string,
		};

		return dal.payments.getByDateRange(paymentRequest, user);
	}

	log.debug('Taking payments by latest interval!');

	const interval = await dal.intervals.getLatest(user);

	log.debug('Latest interval taken!');
	log.trace(interval);

	return await dal.payments.getByIntervalId(interval.id as number, user);
}
