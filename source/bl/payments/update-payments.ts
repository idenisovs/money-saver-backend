import log4js from 'log4js';
import { Payment, User } from '../../shared';
import { savePayments } from './save-payments';
import dal from '../../dal';

const log = log4js.getLogger('update-payments');

export async function updatePayments(payments: Payment|Payment[], user: User) {
    if (!Array.isArray(payments)) {
        payments = [ payments ];
    }

    log.debug('Updating payments (%d) from user <%d>!', payments.length, user.id);

    for (let payment of payments) {
        if (payment.add || !('id' in payment)) {
            await savePayments(payment, user);
        } else if (payment.remove) {
            await dal.payments.deleteById(payment.id as number, user);
        } else {
            await dal.payments.update(payment, user);
        }
    }
}