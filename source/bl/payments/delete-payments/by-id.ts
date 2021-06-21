import { Request } from 'express';
import log4js from 'log4js';
import dal from '../../../dal';
import { User } from '../../../shared';

const log = log4js.getLogger('delete-payment')

export default function deletePaymentById(req: Request): Promise<number> {
    const paymentId = parseInt(req.query.id as string);
    const user = req.user as User;

    log.debug('User <%d> removes payment <%d>!', user.id, paymentId);

    return dal.payments.deleteById(paymentId, user);
}