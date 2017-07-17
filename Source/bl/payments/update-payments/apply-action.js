/**
 * This module decides, which update action should be applied to given payment.
 * Created by I. Denisovs on 17.07.2017..
 */
const deferred = require('deferred');
const log = require('log4js').getLogger('update-payments');

const save = require('./save-payment');
const remove = require('./delete-payment');
const update = require('./update-payment');

function applyAction(payment)
{
    const q = deferred();

    if (!payment.user) {
        payment.user = this.user;
    }

    log.trace(JSON.stringify(payment));

    if (payment.add || !('id' in payment)) {
        save(payment, q);
    } else if (payment.remove) {
        remove(payment, q);
    } else {
        update(payment, q);
    }

    return q.promise;
}

module.exports = applyAction;