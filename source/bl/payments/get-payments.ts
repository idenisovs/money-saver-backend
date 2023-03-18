import moment from 'moment';
import log4js from 'log4js';
import dal from '../../dal';
import { Payment, User } from '../../shared';

const log = log4js.getLogger('get-payments');

type PaymentsRequest = {
  id?: number;
  date?: string;
  from?: number;
  till?: number;
};

export async function getPayments(query: PaymentsRequest, user: User): Promise<Payment[]> {
	log.trace(query);

	if ('id' in query) {
		log.debug('Taking payment by id <%s>!', query.id);
		return [await dal.payments.getById(query.id!, user)];
	}

	if ('date' in query) {
		log.debug('Taking payments by date <%s>!', query.date);
		return dal.payments.getByDate(query.date!, user);
	}

	if (('from' in query) && ('till' in query)) {
		log.debug('Taking payments by date range!');

		const paymentRequest = {
			from: moment(query.from).startOf('day').valueOf(),
			till: moment(query.till).endOf('day').valueOf(),
		};

		return dal.payments.getByDateRange(paymentRequest, user);
	}

	log.debug('Taking payments by latest interval!');

	const interval = await dal.intervals.getLatest(user);

	log.debug('Latest interval taken!');
	log.trace(interval);

	return dal.payments.getByIntervalId(interval.id as number, user);
}
