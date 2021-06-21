import { Request } from 'express';
import moment from 'moment';
import log4js from 'log4js';
import dal from '../../../dal';
import { User } from '../../../shared';

const log = log4js.getLogger('delete-payment');

export default async function deletePaymentsByInterval(req: Request): Promise<number> {
    log.debug('Removing payments by defined From and Till');

    const user = req.user as User;

    const from = parseInt(req.query.from as string);
    const till = parseInt(req.query.till as string);

    const start = moment(from).startOf('day').valueOf();
    const end = moment(till).endOf('day').valueOf();

    return dal.payments.deleteByInterval({ start, end }, user);
}