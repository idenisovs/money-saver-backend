/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var db = require('../db');

var sql = 'UPDATE payments SET sum = $sum WHERE id = $id';

function updatePayment(payment, done)
{
    var params = { $id: payment.id, $sum: payment.sum };

    db.run(sql, params, done);
}

module.exports = updatePayment;