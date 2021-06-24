import log4js from 'log4js';
import { Payment, User } from '../../shared';
import dal from '../../dal';

const log = log4js.getLogger('update-payments');

export async function updatePayments(payments: Payment[], user: User) {
    log.debug('Updating payments (%d) from user <%d>!', payments.length, user.id);

    for (let payment of payments) {
        if (payment.add || !('id' in payment)) {
            return dal.payments.save(payment, user);
        } else if (payment.remove) {
            await dal.payments.deleteById(payment.id as number, user);
        } else {
            await dal.payments.update(payment, user);
        }
    }
}