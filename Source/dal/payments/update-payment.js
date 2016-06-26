/**
 * Created by I.Denisovs on 12.03.2016..
 */

var db = require('../db');

var sql = 'UPDATE payments SET sum = $sum WHERE id = $id AND userId = $userId';

function updatePayment(payment, done)
{
    var params = { $id: payment.id, $sum: payment.sum, $userId: payment.user.id };

    db.run(sql, params, done);
}

module.exports = updatePayment;