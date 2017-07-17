/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var Promise = require('promise');
var moment = require('moment');
var util = require('util');
var log = require('log4js').getLogger('update-payments');
var dal = require('../../dal');

var payments =
{
    'save': require('./save-payments'),
    'delete': require('./delete-payments')
};

function updatePayments(paymentList, success)
{
    var q = [];
    var stat = { added: 0, updated: 0, deleted: 0, failed: 0 };
    var failed = [];

    if (!util.isArray(paymentList))
    {
        paymentList = [ paymentList ];
        paymentList.user = paymentList[0].user;
    }

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

        if (!payment.user)
        {
            payment.user = paymentList.user;
        }

        log.debug('Updating payment...');
        log.trace(JSON.stringify(payment));

        if (payment.add || !('id' in payment))
        {
            log.debug('Saving payment %d', payment.sum);

            save(payment);
        }
        else if (payment.remove)
        {
            log.debug('Removing payment %d', payment.sum);

            remove(payment);
        }
        else
        {
            log.debug('Updating payment %d', payment.sum);

            update(payment);
        }

        function save(payment)
        {
            payment.date = moment(payment.time).format('YYYY-MM-DD');
            log.debug('Saving payment on %s for %s...', payment.date, payment.sum);
            payments.save(payment, onSaveSuccess, onFail);
        }

        function remove(payment)
        {
            var req = { query: payment, user: payment.user };

            log.debug('Deleting payment #%d...', payment.id);

            payments.delete(req, onDeleteSuccess, onFail);
        }

        function update(payment)
        {
            log.debug('Updating payment #%d...', payment.id);

            dal.payments.update(payment, onUpdateDone);
        }

        function onUpdateDone(err)
        {
            if (err)
            {
                return onFail(err);
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
            log.error('Payment #%d (%d) failed!', payment.id || 'new', payment.sum);

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