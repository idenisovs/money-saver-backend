/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var Promise = require('promise');
var moment = require('moment');
var log = require('log4js').getLogger('update-payments');
var dal = require('../../dal/dal');

var payments =
{
    'save': require('./save-payments'),
    'delete': require('./delete-payment')
};


function updatePayments(paymentList, user, success)
{
    var q = [];
    var stat = { added: 0, updated: 0, deleted: 0, failed: 0 };
    var failed = [];

    paymentList.forEach(applyAction);

    Promise.all(q).then(done);

    function done()
    {
        success({ stat: stat, failed: failed });
    }

    function applyAction(payment)
    {
        var resolve;

        q.push(new Promise(makePromise));

        function makePromise(res)
        {
            resolve = res;
        }

        log.trace(payment);

        if (payment.add || !('id' in payment))
        {
            save(payment);
        }
        else if (payment.remove)
        {
            remove(payment);
        }
        else
        {
            update(payment);
        }

        function save(payment)
        {
            payment.date = moment(payment.time).format('YYYY-MM-DD');
            log.debug('Saving payment on %s for %s...', payment.date, payment.sum);
            payments.save(payment, user, onSaveSuccess, onFail);
        }

        function remove(payment)
        {
            var query = { id: payment.id };

            var req = { query: query };

            log.debug('Deleting payment #%d...', payment.id);

            payments.delete(req, user, onDeleteSuccess, onFail);
        }

        function update(payment)
        {
            log.debug('Updating payment #%d...', payment.id);

            dal.payments.update(payment, user.id, onUpdateDone);
        }

        function onUpdateDone(err)
        {
            if (err)
            {
                onFail(err);
                return;
            }

            onUpdateSuccess();
        }

        function onSaveSuccess()
        {
            log.debug('Payment for is %d saved!', payment.sum);
            stat.added++;
            resolve();
        }

        function onUpdateSuccess()
        {
            log.debug('Payment #%d (%d) successfully updated!', payment.id, payment.sum);
            stat.updated++;
            resolve();
        }

        function onDeleteSuccess()
        {
            log.debug('Payment #%d (%d) successfully deleted!', payment.id, payment.sum);
            stat.deleted++;
            resolve();
        }

        function onFail(err)
        {
            log.error('Payment #%d (%d) failed!', payment.id || -1, payment.sum);

            if (err)
            {
                payment.error = err;
            }
            else
            {
                payment.error = 'Unknown';
            }

            log.error(payment.error);

            failed.push(payment);

            stat.failed++;

            resolve();
        }
    }
}

module.exports = updatePayments;