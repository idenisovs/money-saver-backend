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
}

export async function getPayments(request: PaymentsRequest, user: User): Promise<Payment[]> {
    log.trace(request);

    if ('id' in request) {
        log.debug('Taking payment by Id!');
        return [ await dal.payments.getById(request.id!, user) ];
    }

    if ('date' in request) {
        log.debug('Taking payments by date!');
        return await dal.payments.getByDate(request.date!, user);
    }

    if (('from' in request) && ('till' in request)) {
        log.debug('Taking payments by date range!');

        const paymentRequest = {
            from: moment(request.from).startOf('day').valueOf(),
            till: moment(request.till).endOf('day').valueOf(),
        };

        return await dal.payments.getByDateRange(paymentRequest, user);
    }

    log.debug('Taking payments by latest interval!');

    const interval = await dal.intervals.getLatest(user);

    log.debug('Latest interval taken!');
    log.trace(interval);

    return await dal.payments.getByIntervalId(interval.id, user);
}
