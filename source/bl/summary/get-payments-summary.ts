import { Summary, User } from '../../shared';
import log4js from 'log4js';

const log = log4js.getLogger('payments-summary');

export async function getPaymentsSummary(intervalId: number, user: User): Promise<Summary> {
	log.debug('Calculating summary for interval <%d> of user <%d>!', intervalId, user.id);

	return Promise.resolve(new Summary());
}