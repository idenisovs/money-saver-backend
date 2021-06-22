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

export async function getPayments(req: PaymentsRequest, user: User): Promise<Payment[]> {
    log.trace(req);

    if ('id' in req) {
        log.debug('Taking payment by Id!');
        return [ await dal.payments.getById(req.id!, user) ];
    }

    if ('date' in req) {
        log.debug('Taking payments by date!');
        return dal.payments.getByDate(req.date!, user);
    }

    if (('from' in req) && ('till' in req)) {
        log.debug('Taking payments by date range!');

        const paymentRequest = {
            from: moment(req.from).startOf('day').valueOf(),
            till: moment(req.till).endOf('day').valueOf(),
        };

        return dal.payments.getByDateRange(paymentRequest, user);
    }

    log.debug('Taking payments by latest interval!');

    const interval = await dal.intervals.getLatest(user);

    log.debug('Latest interval taken!');
    log.trace(interval);

    return dal.payments.getByIntervalId(interval.id as number, user);
}
