/**
 * This module implements the Update functionality for Payment objects.
 * Created by Ilya Denisov on 12.03.2016..
 */

const Promise = require('promise');
const util = require('util');
const applyAction = require('./apply-action');

function updatePayments(payments, success, error)
{
    const user = payments.user;

    if (!util.isArray(payments)) {
        payments = [ payments ];
    }

    const q = payments.map(applyAction, { user: user });

    Promise.all(q).then(success).catch(error);
}

module.exports = updatePayments;